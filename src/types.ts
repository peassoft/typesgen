/**
 * Applicatition API config
 *
 * @public
 */
export type Config = {
  /** Absolute or relative path to the source file to be processed */
  sourceFilePath: string;
  /**
   * Absolute or relative path to the folder where to place generated files with default names
   *
   * Must be present if separate destination paths are not provided.
   * If at least one separate destination path is provided, this setting is ignored.
   */
  destFolderPath?: string;
  /** Absolute or relative path to the file which OpenAPI descriptions should be generated into */
  openapiDestPath?: string;
  /**
   * Absolute or relative path to the file which MongoDB validation schemas
   * should be generated into
   */
  mongodbDestPath?: string;
  /** Absolute or relative path to the file which JDV validation schemas should be generated into */
  jdvDestPath?: string;
};

/** Application inner config */
export type InnerConfig = {
  /** Absolute path to the source file to be processed */
  sourceFileAbsPath: string;
  /** Absolute path to the file which OpenAPI descriptions should be generated into */
  openapiDestAbsPath?: string;
  /** Absolute path to the file which MongoDB validation schemas should be generated into */
  mongodbDestAbsPath?: string;
  /** Absolute path to the file which JDV validation schemas should be generated into */
  jdvDestAbsPath?: string;
};

export type Entity = EntityBase & EntityDescriptor;

export type EntityBase = {
  name: string;
  public: boolean;
  description?: string;
};

type EntityDescriptor =
  | {
    type: EntityType.Object;
    members: Set<ObjectMember>;
  }
  | {
    type: EntityType.Enum;
    members: Set<EnumMember>;
  };

export enum EntityType {
  Object = 'object',
  Enum = 'enum',
}

export type ObjectMemberBase = {
  name: string;
  required: boolean;
  nullable: boolean;
  description?: string;
};

type NumberDescriptor = {
  type: ObjectMemberType.Number;
};
type StringDescriptor = {
  type: ObjectMemberType.String;
};
type BooleanDescriptor = {
  type: ObjectMemberType.Boolean;
};
type TypeReferenceDescriptor = {
  type: ObjectMemberType.TypeReference;
  typeName: string;
};
export type ArrayDescriptor = {
  type: ObjectMemberType.Array;
  items: ObjectMemberDescriptor;
};
type ObjectDescriptor = {
  type: ObjectMemberType.Object;
  members: Set<ObjectMember>;
};
export type RecordDescriptor = {
  type: ObjectMemberType.Record;
  key: ObjectMemberType.String
    | ObjectMemberType.UUID
    | ObjectMemberType.ISODateString;
  value: ObjectMemberDescriptor;
};
type IntegerDescriptor = {
  type: ObjectMemberType.Integer;
};
type ISODateStringDescriptor = {
  type: ObjectMemberType.ISODateString;
};
type UUIDDescriptor = {
  type: ObjectMemberType.UUID;
};

export type ObjectMemberDescriptor =
  | NumberDescriptor
  | StringDescriptor
  | BooleanDescriptor
  | TypeReferenceDescriptor
  | ArrayDescriptor
  | ObjectDescriptor
  | RecordDescriptor
  | IntegerDescriptor
  | ISODateStringDescriptor
  | UUIDDescriptor;

export type ObjectMember = ObjectMemberBase & ObjectMemberDescriptor;

export enum ObjectMemberType {
  Number = 'number',
  String = 'string',
  Boolean = 'boolean',
  Array = 'array',
  Object = 'object',
  Record = 'record',
  TypeReference = 'type_reference',
  Integer = 'integer',
  ISODateString = 'iso_date_string',
  UUID = 'uuid',
}

export type EnumMember = {
  key: string;
  value: string;
  description?: string;
};

export type TempItem = Record<string, string | boolean | TempItem[]>;
