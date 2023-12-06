import { spaces } from '../util.js';
import {
  type Entity,
  type ObjectMember,
  type ObjectMemberDescriptor,
  type ArrayDescriptor,
  type EnumMember,
  EntityType,
  ObjectMemberType,
} from '../../../types.js';

type TypeInfo = {
  type: string;
  referredEntity: Entity | null;
}

export default class Generator {
  #entities: Set<Entity>;

  constructor(entities: Set<Entity>) {
    this.#entities = entities;
  }

  generate(): string {
    let result = '\'use strict\';\n\n' + 'module.exports = {';

    for (const entity of this.#entities) {
      switch (entity.type) {
        case EntityType.Enum:
          continue;

        case EntityType.Object: {
          if (!entity.public) continue;

          result += `\n${spaces(2)}${entity.name}: {`;
          result += `\n${spaces(4)}validator: {`;
          result += `\n${spaces(6)}$jsonSchema: {`;
          result += `\n${spaces(8)}bsonType: 'object',`;
          result += `\n${spaces(8)}required: [`;

          for (const prop of this.#getRequiredProps(entity.members)) {
            result += `\n${spaces(10)}'${prop}',`;
          }

          result += `\n${spaces(8)}],`;
          result += `\n${spaces(8)}properties: {`;
          result += this.#generateObjectProps(entity.members, 10);
          result += `\n${spaces(8)}},`;
          result += `\n${spaces(6)}},`;
          result += `\n${spaces(4)}},`;
          result += `\n${spaces(2)}},`;
          break;
        }
      }
    }

    result += '\n};\n';

    return result;
  }

  #getRequiredProps(props: Set<ObjectMember>): string[] {
    const requiredFields: string[] = [];

    for (const prop of props) {
      if (prop.required) {
        requiredFields.push(prop.name);
      }
    }

    return requiredFields;
  }

  #getTypeInfo(objectMember: ObjectMemberDescriptor): TypeInfo {
    let type: string;
    let referredEntity: Entity | null = null;

    switch (objectMember.type) {
      case ObjectMemberType.Number:
        type = 'double';
        break;
      case ObjectMemberType.String:
        type = 'string';
        break;
      case ObjectMemberType.Boolean:
        type = 'bool';
        break;
      case ObjectMemberType.Array:
        type = 'array';
        break;
      case ObjectMemberType.Object:
        type = 'object';
        break;
      case ObjectMemberType.Record:
        type = 'object';
        break;
      case ObjectMemberType.TypeReference: {
        for (const entity of this.#entities) {
          if (entity.name === objectMember.typeName) {
            referredEntity = entity;
          }
        }

        if (!referredEntity) {
          throw new Error(
            `entity definition is not found for type reference ${objectMember.typeName}`,
          );
        }

        switch (referredEntity.type) {
          case EntityType.Object:
            type = 'object';
            break;
          case EntityType.Enum:
            type = 'enum';
        }

        break;
      }
      case ObjectMemberType.Integer:
        type = 'int';
        break;
      case ObjectMemberType.ISODateString:
        type = 'date';
        break;
      case ObjectMemberType.UUID:
        type = 'string';
    }

    return {
      type,
      referredEntity,
    };
  }

  #generateObjectProps(props: Set<ObjectMember>, indent: number): string {
    let result = '';

    for (const prop of props) {
      const { type, referredEntity } = this.#getTypeInfo(prop);

      result += `\n${spaces(indent)}${prop.name}: {`;

      if (type !== 'enum') {
        if (prop.nullable) {
          result += `\n${spaces(indent + 2)}bsonType: ['null', '${type}'],`;
        } else {
          result += `\n${spaces(indent + 2)}bsonType: '${type}',`;
        }
      }

      switch (prop.type) {
        case ObjectMemberType.Array:
          result += `\n${spaces(indent + 2)}items: {`;
          result += this.#generateArrayDescription(prop, indent + 4);
          result += `\n${spaces(indent + 2)}},`;
          break;

        case ObjectMemberType.Object:
          result += `\n${spaces(indent + 2)}required: [`;

          for (const p of this.#getRequiredProps(prop.members)) {
            result += `\n${spaces(indent + 4)}'${p}',`;
          }

          result += `\n${spaces(indent + 2)}],`;
          result += `\n${spaces(indent + 2)}properties: {`;
          result += this.#generateObjectProps(prop.members, indent + 4);
          result += `\n${spaces(indent + 2)}},`;
          break;

        case ObjectMemberType.TypeReference: {
          if (!referredEntity) {
            throw new Error(`referenced type ${prop.typeName} not found`);
          }

          switch (referredEntity.type) {
            case EntityType.Object:
              result += `\n${spaces(indent + 2)}required: [`;

              for (const prop of this.#getRequiredProps(referredEntity.members)) {
                result += `\n${spaces(indent + 4)}'${prop}',`;
              }

              result += `\n${spaces(indent + 2)}],`;
              result += `\n${spaces(indent + 2)}properties: {`;
              result += this.#generateObjectProps(referredEntity.members, indent + 4);
              result += `\n${spaces(indent + 2)}},`;
              break;

            case EntityType.Enum:
              result += `\n${spaces(indent + 2)}enum: [`;

              if (prop.nullable) {
                result += `\n${spaces(indent + 4)}null,`;
              }

              result += this.#generateEnumMembers(referredEntity.members, indent + 4);
              result += `\n${spaces(indent + 2)}],`;
              break;
          }

          break;
        }
      }

      result += `\n${spaces(indent)}},`;
    }

    return result;
  }

  #generateArrayDescription(arrayDescriptor: ArrayDescriptor, indent: number): string {
    let result = '';

    const { type, referredEntity } = this.#getTypeInfo(arrayDescriptor.items);

    if (type !== 'enum') {
      result += `\n${spaces(indent)}bsonType: '${type}',`;
    }

    switch (arrayDescriptor.items.type) {
      case ObjectMemberType.Object:
        result += `\n${spaces(indent)}required: [`;

        for (const prop of this.#getRequiredProps(arrayDescriptor.items.members)) {
          result += `\n${spaces(indent + 2)}'${prop}',`;
        }

        result += `\n${spaces(indent)}],`;
        result += `\n${spaces(indent)}properties: {`;
        result += this.#generateObjectProps(arrayDescriptor.items.members, indent + 2);
        result += `\n${spaces(indent)}},`;
        break;

      case ObjectMemberType.TypeReference: {
        if (!referredEntity) {
          throw new Error(`referenced type ${arrayDescriptor.items.typeName} not found`);
        }

        switch (referredEntity.type) {
          case EntityType.Object:
            result += `\n${spaces(indent)}required: [`;

            for (const prop of this.#getRequiredProps(referredEntity.members)) {
              result += `\n${spaces(indent + 2)}'${prop}',`;
            }

            result += `\n${spaces(indent)}],`;
            result += `\n${spaces(indent)}properties: {`;
            result += this.#generateObjectProps(referredEntity.members, indent + 2);
            result += `\n${spaces(indent)}},`;
            break;

          case EntityType.Enum:
            result += `\n${spaces(indent)}enum: [`;
            result += this.#generateEnumMembers(referredEntity.members, indent + 2);
            result += `\n${spaces(indent)}],`;
            break;
        }

        break;
      }
    }

    return result;
  }


  #generateEnumMembers(members: Set<EnumMember>, indent: number): string {
    let result = '';

    for (const member of members) {
      result += `\n${spaces(indent)}'${member.value}',`;
    }

    return result;
  }
}
