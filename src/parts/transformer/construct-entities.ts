import {
  type Entity,
  type EntityBase,
  type TempItem,
  type ObjectMember,
  type ObjectMemberDescriptor,
  type EnumMember,
  EntityType,
  ObjectMemberType,
} from '../../types.js';

export default function constructEntities(tempEntities: Set<TempItem>): Set<Entity> {
  const entities: Set<Entity> = new Set();

  for (const te of tempEntities) {
    // console.dir(te, { depth: 10 });

    if (!te.name || typeof te.name !== 'string') {
      throw new Error('an entity without name is encountered');
    }

    const name: string = te.name;

    if (
      name === 'Integer' ||
      name === 'ISODateString' ||
      name === 'UUID'
    ) {
      continue;
    }

    const base: EntityBase = {
      name: te.name,
      public: te.public === true,
      ...te.description && typeof te.description === 'string'
        ? { description: te.description }
        : {},
    };

    switch (te.type) {
      case 'object': {
        if (!Array.isArray(te.members) || te.members.length === 0) {
          throw new Error(`entity ${te.name} of type object has no members`);
        }

        entities.add({
          ...base,
          type: EntityType.Object,
          members: new Set(te.members.map(member => constructObjectMember(member, name))),
        });

        break;
      }

      case 'enum': {
        if (!Array.isArray(te.members) || te.members.length === 0) {
          throw new Error(`entity ${te.name} of type enum has no members`);
        }

        entities.add({
          ...base,
          type: EntityType.Enum,
          members: new Set(te.members.map(member => constructEnumMember(member, name))),
        });

        break;
      }

      default:
        throw new Error(`entity ${te.name} has no type`);
    }
  }

  return entities;
}

function constructObjectMember(member: TempItem, parentName: string): ObjectMember {
  if (!member.name || typeof member.name !== 'string') {
    throw new Error(`object member without name is encountered in ${parentName}`);
  }

  return {
    name: member.name,
    required: member.optional !== true,
    nullable: member.nullable === true,
    ...member.description && typeof member.description === 'string'
      ? { description: member.description }
      : {},
    ...constructObjectMemberDescriptor(member, parentName),
  };
}

function constructObjectMemberDescriptor(
  member: TempItem,
  parentName: string,
): ObjectMemberDescriptor {
  const propPath = parentName +
    (
      typeof member.name === 'string' && member.name
        ? `.${member.name}`
        : ''
    );

  switch (member.type) {
    case 'string':
      return {
        type: ObjectMemberType.String,
      };

    case 'number':
      return {
        type: ObjectMemberType.Number,
      };

    case 'boolean':
      return {
        type: ObjectMemberType.Boolean,
      };

    case 'array': {
      let items: ObjectMemberDescriptor;

      if (Array.isArray(member.items)) {
        const item = member.items[0];

        if (!item) {
          throw new Error(`object member ${propPath} of type array has empty items descriptor`);
        }

        switch (item.type) {
          case 'number':
            items = { type: ObjectMemberType.Number };
            break;

          case 'string':
            items = { type: ObjectMemberType.String };
            break;

          case 'boolean':
            items = { type: ObjectMemberType.Boolean };
            break;

          case 'type_reference': {
            if (!item.typeName || typeof item.typeName !== 'string') {
              throw new Error(
                `object member ${propPath} of type array of type references has no type name ` +
                'or unexpected type name',
              );
            }

            switch (item.typeName) {
              case 'Integer':
                items = {
                  type: ObjectMemberType.Integer,
                };
                break;
              case 'ISODateString':
                items = {
                  type: ObjectMemberType.ISODateString,
                };
                break;
              case 'UUID':
                items = {
                  type: ObjectMemberType.UUID,
                };
                break;
              default:
                items = {
                  type: ObjectMemberType.TypeReference,
                  typeName: item.typeName,
                };
            }

            break;
          }

          case 'object': {
            if (!Array.isArray(item.members) || item.members.length === 0) {
              throw new Error(`object member ${propPath} of type array of objects has no members`);
            }

            items = {
              type: ObjectMemberType.Object,
              members: new Set(item.members.map(m => constructObjectMember(m, `${propPath}.m`))),
            };

            break;
          }

          case 'record':
            items = constructObjectMemberDescriptor(item, parentName);
            break;

          default:
            throw new Error(
              `object member ${propPath} of type array has incorrect ` +
              'item type',
            );
        }
      } else {
        throw new Error(
          `object member ${propPath} of type array has no items ` +
          'or unexpected items type',
        );
      }

      return {
        type: ObjectMemberType.Array,
        items,
      };
    }

    case 'type_reference': {
      if (!member.typeName || typeof member.typeName !== 'string') {
        throw new Error(
          `object member ${propPath} of type type_reference has no type name ` +
          'or unexpected type name',
        );
      }

      if (member.typeName === 'Integer') {
        return {
          type: ObjectMemberType.Integer,
        };
      }

      if (member.typeName === 'ISODateString') {
        return {
          type: ObjectMemberType.ISODateString,
        };
      }

      if (member.typeName === 'UUID') {
        return {
          type: ObjectMemberType.UUID,
        };
      }

      return {
        type: ObjectMemberType.TypeReference,
        typeName: member.typeName,
      };
    }

    case 'object': {
      if (!Array.isArray(member.members) || member.members.length === 0) {
        throw new Error(`object member ${propPath} of type object has no members`);
      }

      return {
        type: ObjectMemberType.Object,
        members: new Set(member.members.map(m => constructObjectMember(m, `${propPath}.m`))),
      };
    }

    case 'record': {
      if (!Array.isArray(member.recordParams)) {
        throw new Error(`object member ${propPath} of type record has no params`);
      }

      const keyType = member.recordParams[0]?.type;
      const keyTypeName = member.recordParams[0]?.typeName;

      let key: ObjectMemberType;

      if (keyType === 'string') {
        key = ObjectMemberType.String;
      } else if (keyType === 'type_reference' && keyTypeName === 'UUID') {
        key = ObjectMemberType.UUID;
      } else if (keyType === 'type_reference' && keyTypeName === 'ISODateString') {
        key = ObjectMemberType.ISODateString;
      } else {
        throw new Error(`object member ${propPath} of type record has invalid key param`);
      }

      const value = member.recordParams[1];

      if (!value) {
        throw new Error(`object member ${propPath} of type record has invalid value param`);
      }

      return {
        type: ObjectMemberType.Record,
        key,
        value: constructObjectMemberDescriptor(value, `${propPath}.recordParams.value`),
      };
    }

    default:
      throw new Error(`object member ${propPath} has no type or unexpected type`);
  }
}


function constructEnumMember(member: TempItem, parentName: string): EnumMember {
  if (!member.name || typeof member.name !== 'string') {
    throw new Error(`enum member without name is encountered in ${parentName}`);
  }

  if (!member.text || typeof member.text !== 'string') {
    throw new Error(`enum member without text is encountered in ${parentName}`);
  }

  return {
    key: member.name,
    value: member.text,
    ...member.description && typeof member.description === 'string'
      ? { description: member.description }
      : {},
  };
}
