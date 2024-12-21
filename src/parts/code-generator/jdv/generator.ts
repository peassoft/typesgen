import { spaces } from '../util.js';
import {
  type Entity,
  type ObjectMember,
  type ObjectMemberDescriptor,
  type ArrayDescriptor,
  type RecordDescriptor,
  EntityType,
  ObjectMemberType,
} from '../../../types.js';

export default class Generator {
  #entities: Set<Entity>;

  constructor(entities: Set<Entity>) {
    this.#entities = entities;
  }

  generate(): string {
    let result = 'import jdv from \'@peassoft/jdv\';';
    result += '\n\nexport default {';

    for (const entity of this.#entities) {
      switch (entity.type) {
        case EntityType.Enum:
          continue;

        case EntityType.Object: {
          if (!entity.public) continue;

          result += `\n${spaces(2)}${entity.name}: ` +
            `jdv.object('${entity.name} must be an object').keys({` +
            this.#generateObjectSchema(entity.members, 2, entity.name) +
            `\n${spaces(2)}}),`;
          break;
        }
      }
    }

    result += '\n};\n';

    return result;
  }

  #generateSchema(item: ObjectMemberDescriptor, indent: number, path: string): string {
    let result = 'jdv';

    switch (item.type) {
      case ObjectMemberType.Number:
        result += `\n${spaces(indent)}.number('${path} must be a number')`;
        break;
      case ObjectMemberType.String:
        result += `\n${spaces(indent)}.string('${path} must be a string')`;
        break;
      case ObjectMemberType.Boolean:
        result += `\n${spaces(indent)}.boolean('${path} must be a boolean')`;
        break;
      case ObjectMemberType.Array:
        result += `\n${spaces(indent)}.array({`;
        result += this.#generateArraySchema(item, indent + 2, path);
        result += `\n${spaces(indent)}})`;
        break;
      case ObjectMemberType.Object:
        result += `\n${spaces(indent)}.object('${path} must be an object').keys({`;
        result += this.#generateObjectSchema(item.members, indent, path);
        result += `\n${spaces(indent)}})`;
        break;
      case ObjectMemberType.Record:
        result += `\n${spaces(indent)}.record({`;
        result += this.#generateRecordSchema(item, indent + 2, path);
        result += `\n${spaces(indent)}})`;
        break;
      case ObjectMemberType.TypeReference: {
        let referredEntity: Entity | null = null;

        for (const entity of this.#entities) {
          if (entity.name === item.typeName) {
            referredEntity = entity;
          }
        }

        if (!referredEntity) {
          throw new Error(
            `entity definition is not found for type reference ${item.typeName}`,
          );
        }

        switch (referredEntity.type) {
          case EntityType.Object:
            result += `\n${spaces(indent)}.object('${path} must be an object').keys({`;
            result += this.#generateObjectSchema(referredEntity.members, indent, path);
            result += `\n${spaces(indent)}})`;
            break;
          case EntityType.Enum:
            result += `\n${spaces(indent)}.string('${path} must be a string')`;
        }

        break;
      }
      case ObjectMemberType.Integer:
        result += `\n${spaces(indent)}.integer('${path} must be an integer')`;
        break;
      case ObjectMemberType.ISODateString:
        result +=
          `\n${spaces(indent)}.ISODateString('${path} must be a string in ISO date format')`;
        break;
      case ObjectMemberType.UUID:
        result += `\n${spaces(indent)}.uuid('${path} must be a string representation of UUID')`;
    }

    return result;
  }

  #generateObjectSchema(props: Set<ObjectMember>, indent: number, path: string): string {
    let result = '';

    for (const prop of props) {
      const localPath = `${path}.${prop.name}`;

      result += `\n${spaces(indent + 2)}${prop.name}: ` +
        this.#generateSchema(prop, indent + 4, `${localPath}`);

      if (prop.required) {
        result += `\n${spaces(indent + 4)}.required('${localPath} is required')`;
      }

      if (prop.nullable) {
        result += `\n${spaces(indent + 4)}.nullable()`;
      }

      result += ',';
    }

    return result;
  }

  #generateArraySchema(arrayDescriptor: ArrayDescriptor, indent: number, path: string): string {
    let result = '';

    result += `\n${spaces(indent)}schema: ` +
      this.#generateSchema(arrayDescriptor.items, indent + 2, `${path}[i]`) +
      ',';
    result += `\n${spaces(indent)}msg: '${path} must be an array',`;

    return result;
  }

  #generateRecordSchema(recordDescriptor: RecordDescriptor, indent: number, path: string): string {
    let result = '';

    let keyDescriptor: ObjectMemberDescriptor;

    switch (recordDescriptor.key) {
      case ObjectMemberType.String:
        keyDescriptor = { type: ObjectMemberType.String };
        break;
      case ObjectMemberType.ISODateString:
        keyDescriptor = { type: ObjectMemberType.ISODateString };
        break;
      case ObjectMemberType.UUID:
        keyDescriptor = { type: ObjectMemberType.UUID };
    }

    result += `\n${spaces(indent)}schemaForKey: ` +
      this.#generateSchema(keyDescriptor, indent + 2, `${path}[key]`) +
      ',';
    result += `\n${spaces(indent)}schemaForValue: ` +
      this.#generateSchema(recordDescriptor.value, indent + 2, `${path}[value]`) +
      ',';
    result += `\n${spaces(indent)}msg: '${path} must be a record',`;

    return result;
  }
}
