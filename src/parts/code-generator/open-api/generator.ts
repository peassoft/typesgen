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
  format: string | null;
  referredEntity: Entity | null;
};

export default class Generator {
  #entities: Set<Entity>;

  constructor(entities: Set<Entity>) {
    this.#entities = entities;
  }

  generate(): string {
    let result = 'export default {';

    for (const entity of this.#entities) {
      switch (entity.type) {
        case EntityType.Enum:
          continue;

        case EntityType.Object: {
          if (!entity.public) continue;

          result += `\n${spaces(2)}${entity.name}: {`;
          result += `\n${spaces(4)}type: 'object',`;

          if (entity.description) {
            result += `\n${spaces(4)}description: '${entity.description}',`;
          }

          result += `\n${spaces(4)}properties: {`;
          result += this.#generateObjectProps(entity.members, 6);
          result += `\n${spaces(4)}},`;
          result += `\n${spaces(2)}},`;
          break;
        }
      }
    }

    result += '\n};\n';

    return result;
  }

  #getTypeInfo(objectMember: ObjectMemberDescriptor): TypeInfo {
    let type: string;
    let format = '';
    let referredEntity: Entity | null = null;

    switch (objectMember.type) {
      case ObjectMemberType.Number:
        type = 'number';
        format = 'double';
        break;
      case ObjectMemberType.String:
        type = 'string';
        break;
      case ObjectMemberType.Boolean:
        type = 'boolean';
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
            type = 'string';
        }

        break;
      }
      case ObjectMemberType.Integer:
        type = 'number';
        format = 'int32';
        break;
      case ObjectMemberType.ISODateString:
        type = 'string';
        format = 'date-time';
        break;
      case ObjectMemberType.UUID:
        type = 'string';
    }

    return {
      type,
      format: format || null,
      referredEntity,
    };
  }

  #generateObjectProps(props: Set<ObjectMember>, indent: number): string {
    let result = '';

    for (const prop of props) {
      const { type, format, referredEntity } = this.#getTypeInfo(prop);

      result += `\n${spaces(indent)}${prop.name}: {`;
      result += `\n${spaces(indent + 2)}type: '${type}',`;

      if (format) {
        result += `\n${spaces(indent + 2)}format: '${format}',`;
      }

      if (prop.description) {
        result += `\n${spaces(indent + 2)}description: '${prop.description}',`;
      }

      result += `\n${spaces(indent + 2)}required: ${prop.required ? 'true' : 'false'},`;
      result += `\n${spaces(indent + 2)}nullable: ${prop.nullable ? 'true' : 'false'},`;

      switch (prop.type) {
        case ObjectMemberType.Array:
          result += `\n${spaces(indent + 2)}items: {`;
          result += this.#generateArrayDescription(prop, indent + 4);
          result += `\n${spaces(indent + 2)}},`;
          break;

        case ObjectMemberType.Object:
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
              result += `\n${spaces(indent + 2)}properties: {`;
              result += this.#generateObjectProps(referredEntity.members, indent + 4);
              result += `\n${spaces(indent + 2)}},`;
              break;

            case EntityType.Enum:
              result += `\n${spaces(indent + 2)}enum: [`;
              result += this.#generateEnumMembers(referredEntity.members, indent + 4);
              result += `\n${spaces(indent + 2)}],`;
              break;
          }

          break;
        }

        case ObjectMemberType.Record:
          result += `\n${spaces(indent + 2)}additionalProperties: {`;
          result += this.#generateRecordDescription(prop.value, indent + 4);
          result += `\n${spaces(indent + 2)}},`;
          break;
      }

      result += `\n${spaces(indent)}},`;
    }

    return result;
  }

  #generateArrayDescription(arrayDescriptor: ArrayDescriptor, indent: number): string {
    let result = '';

    const { type, format, referredEntity } = this.#getTypeInfo(arrayDescriptor.items);

    result += `\n${spaces(indent)}type: '${type}',`;

    if (format) {
      result += `\n${spaces(indent)}format: '${format}',`;
    }

    switch (arrayDescriptor.items.type) {
      case ObjectMemberType.Object:
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

      case ObjectMemberType.Record:
        result += `\n${spaces(indent)}additionalProperties: {`;
        result += this.#generateRecordDescription(arrayDescriptor.items.value, indent + 2);
        result += `\n${spaces(indent)}},`;
        break;
    }

    return result;
  }

  #generateRecordDescription(value: ObjectMemberDescriptor, indent: number): string {
    let result = '';

    const { type, format, referredEntity } = this.#getTypeInfo(value);

    result += `\n${spaces(indent)}type: '${type}',`;

    if (format) {
      result += `\n${spaces(indent)}format: '${format}',`;
    }

    switch (value.type) {
      case ObjectMemberType.Array:
        result += `\n${spaces(indent)}items: {`;
        result += this.#generateArrayDescription(value, indent + 2);
        result += `\n${spaces(indent)}},`;
        break;

      case ObjectMemberType.Object:
        result += `\n${spaces(indent)}properties: {`;
        result += this.#generateObjectProps(value.members, indent + 2);
        result += `\n${spaces(indent)}},`;
        break;

      case ObjectMemberType.TypeReference: {
        if (!referredEntity) {
          throw new Error(`referenced type ${value.typeName} not found`);
        }

        switch (referredEntity.type) {
          case EntityType.Object:
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

      case ObjectMemberType.Record:
        result += `\n${spaces(indent)}additionalProperties: {`;
        result += this.#generateRecordDescription(value.value, indent + 2);
        result += `\n${spaces(indent)}},`;
        break;
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
