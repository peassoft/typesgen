import fs from 'node:fs';
import path from 'node:path';

import { createAppInnerConfig } from '../../src/modules/app-config/index.js';
import { parse } from '../../src/parts/parser/index.js';
import { transform } from '../../src/parts/transformer/index.js';
import { CodeGenerator } from '../../src/parts/code-generator/index.js';
import {
  type Entity,
  EntityType,
  type ObjectMember,
  ObjectMemberType,
  type Config,
} from '../../src/types.js';

describe('e2e tests', () => {
  const config: Config = {
    sourceFilePath: new URL('./source.ts', import.meta.url).pathname,
    destFolderPath: new URL('./dest/', import.meta.url).pathname,
  };

  const innerConfig = createAppInnerConfig(config);

  if (
    !innerConfig.openapiDestAbsPath ||
    !innerConfig.mongodbDestAbsPath ||
    !innerConfig.jdvDestAbsPath
  ) {
    throw new Error('incorrect inner config');
  }

  const ast = parse(innerConfig.sourceFileAbsPath);

  const expectedEntities = new Set<Entity>();

  expectedEntities.add({
    name: 'TestEntity1',
    type: EntityType.Object,
    public: true,
    members: new Set<ObjectMember>([
      {
        name: 'prop1',
        required: true,
        nullable: false,
        type: ObjectMemberType.Number,
        description: 'jsdoc for prop1',
      },
      {
        name: 'prop2',
        required: false,
        nullable: false,
        type: ObjectMemberType.String,
        description: 'jsdoc for prop2',
      },
      {
        name: 'prop3',
        required: true,
        nullable: false,
        type: ObjectMemberType.Boolean,
      },
      {
        name: 'prop4',
        required: true,
        nullable: true,
        type: ObjectMemberType.String,
      },
      {
        name: 'prop5',
        required: true,
        nullable: true,
        type: ObjectMemberType.Boolean,
      },
      {
        name: 'prop6',
        required: true,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.Number,
        },
      },
      {
        name: 'prop7',
        required: false,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.String,
        },
      },
      {
        name: 'prop8',
        required: true,
        nullable: true,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.Boolean,
        },
      },
      {
        name: 'prop9',
        required: true,
        nullable: true,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.Boolean,
        },
      },
      {
        name: 'prop10',
        required: true,
        nullable: false,
        type: ObjectMemberType.TypeReference,
        typeName: 'TestEntity2',
      },
      {
        name: 'prop11',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: { type: ObjectMemberType.String },
      },
      {
        name: 'prop12',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: { type: ObjectMemberType.Number },
      },
      {
        name: 'prop13',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: { type: ObjectMemberType.Boolean },
      },
      {
        name: 'prop14',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: { type: ObjectMemberType.String },
        },
      },
      {
        name: 'prop15',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: { type: ObjectMemberType.Number },
        },
      },
      {
        name: 'prop16',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: { type: ObjectMemberType.Boolean },
        },
      },
      {
        name: 'prop17',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.TypeReference,
          typeName: 'TestEntity2',
        },
      },
      {
        name: 'prop18',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: {
            type: ObjectMemberType.TypeReference,
            typeName: 'TestEntity2',
          },
        },
      },
      {
        name: 'prop19',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Object,
          members: new Set([
            {
              name: 'p1',
              required: true,
              nullable: false,
              type: ObjectMemberType.String,
            },
          ]),
        },
      },
      {
        name: 'prop20',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: {
            type: ObjectMemberType.Object,
            members: new Set([
              {
                name: 'p1',
                required: true,
                nullable: false,
                type: ObjectMemberType.String,
              },
            ]),
          },
        },
      },
      {
        name: 'prop21',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Record,
          key: ObjectMemberType.String,
          value: {
            type: ObjectMemberType.Number,
          },
        },
      },
      {
        name: 'prop22',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: {
            type: ObjectMemberType.Record,
            key: ObjectMemberType.String,
            value: {
              type: ObjectMemberType.Number,
            },
          },
        },
      },
      {
        name: 'prop23',
        required: true,
        nullable: false,
        type: ObjectMemberType.Integer,
      },
      {
        name: 'prop24',
        required: true,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.Integer,
        },
      },
      {
        name: 'prop25',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Integer,
        },
      },
      {
        name: 'prop26',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: {
            type: ObjectMemberType.Integer,
          },
        },
      },
      {
        name: 'prop27',
        required: true,
        nullable: false,
        type: ObjectMemberType.ISODateString,
      },
      {
        name: 'prop28',
        required: true,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.ISODateString,
        },
      },
      {
        name: 'prop29',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.ISODateString,
        },
      },
      {
        name: 'prop30',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: {
            type: ObjectMemberType.ISODateString,
          },
        },
      },
      {
        name: 'prop31',
        required: true,
        nullable: false,
        type: ObjectMemberType.UUID,
      },
      {
        name: 'prop32',
        required: true,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.UUID,
        },
      },
      {
        name: 'prop33',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.UUID,
        },
      },
      {
        name: 'prop34',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.Array,
          items: {
            type: ObjectMemberType.UUID,
          },
        },
      },
      {
        name: 'prop35',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.UUID,
        value: {
          type: ObjectMemberType.String,
        },
      },
      {
        name: 'prop36',
        required: true,
        nullable: false,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.ISODateString,
        value: {
          type: ObjectMemberType.String,
        },
      },
      {
        name: 'prop37',
        required: true,
        nullable: true,
        type: ObjectMemberType.Record,
        key: ObjectMemberType.String,
        value: {
          type: ObjectMemberType.String,
        },
      },
      {
        name: 'prop38',
        required: true,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.Record,
          key: ObjectMemberType.String,
          value: {
            type: ObjectMemberType.String,
          },
        },
      },
      {
        name: 'prop39',
        required: true,
        nullable: true,
        type: ObjectMemberType.TypeReference,
        typeName: 'MyEnum',
      },
      {
        name: 'prop40',
        required: true,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.TypeReference,
          typeName: 'MyEnum',
        },
      },
      {
        name: 'prop41',
        required: true,
        nullable: false,
        type: ObjectMemberType.Array,
        items: {
          type: ObjectMemberType.TypeReference,
          typeName: 'TestEntity3',
        },
      },
    ]),
  });

  expectedEntities.add({
    name: 'TestEntity2',
    type: EntityType.Object,
    public: false,
    description: 'jsdoc for TestEntity2',
    members: new Set<ObjectMember>([
      {
        name: 'prop1',
        required: true,
        nullable: false,
        type: ObjectMemberType.Object,
        description: 'jsdoc for prop1',
        members: new Set<ObjectMember>([
          {
            name: 'p1',
            required: true,
            nullable: false,
            type: ObjectMemberType.Number,
          },
          {
            name: 'p2',
            required: false,
            nullable: true,
            type: ObjectMemberType.Array,
            items: {
              type: ObjectMemberType.Boolean,
            },
          },
          {
            name: 'p3',
            required: true,
            nullable: false,
            type: ObjectMemberType.Array,
            items: {
              type: ObjectMemberType.Object,
              members: new Set<ObjectMember>([
                {
                  name: 'p4',
                  required: true,
                  nullable: false,
                  type: ObjectMemberType.String,
                },
              ]),
            },
          },
          {
            name: 'p5',
            required: true,
            nullable: false,
            type: ObjectMemberType.TypeReference,
            typeName: 'MyEnum',
          },
        ]),
      },
    ]),
  });

  expectedEntities.add({
    name: 'TestEntity3',
    type: EntityType.Object,
    public: false,
    members: new Set<ObjectMember>([
      {
        name: 'foo',
        nullable: false,
        required: true,
        type: ObjectMemberType.String,
      },
      {
        name: 'bar',
        nullable: false,
        required: false,
        type: ObjectMemberType.Number,
      },
    ]),
  });

  expectedEntities.add({
    name: 'MyEnum',
    type: EntityType.Enum,
    public: true,
    description: 'Description for MyEnum',
    members: new Set([
      {
        key: 'Foo',
        value: 'foo',
        description: 'Description for Foo',
      },
      {
        key: 'Bar',
        value: 'bar',
      },
    ]),
  });

  const actualEntities = transform(ast);

  it('should correctly transform AST into entities', () => {
    expect(actualEntities).toEqual(expectedEntities);
  });

  const expectedPath = new URL('./expected/', import.meta.url).pathname;

  const codeGenerator = new CodeGenerator(actualEntities, innerConfig);

  codeGenerator.openApi();

  const openApiExpected = fs.readFileSync(path.join(expectedPath, 'openapi.js'), 'utf-8');
  const openApiActual = fs.readFileSync(innerConfig.openapiDestAbsPath, 'utf-8');

  it('should correctly generate OpenAPI models', () => {
    expect(openApiActual.trim()).toBe(openApiExpected.trim());
  });

  codeGenerator.mongoDb();

  const mongodbExpected = fs.readFileSync(path.join(expectedPath, 'mongodb.js'), 'utf-8');
  const mongodbActual = fs.readFileSync(innerConfig.mongodbDestAbsPath, 'utf-8');

  it('should correctly generate MongoDB validation schemas', () => {
    expect(mongodbActual.trim()).toBe(mongodbExpected.trim());
  });

  codeGenerator.jdv();

  const jdvExpected = fs.readFileSync(path.join(expectedPath, 'jdv.js'), 'utf-8');
  const jdvActual = fs.readFileSync(innerConfig.jdvDestAbsPath, 'utf-8');

  it('should correctly generate Jdv validation schemas', () => {
    expect(jdvActual.trim()).toBe(jdvExpected.trim());
  });
});
