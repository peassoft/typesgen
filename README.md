# @peassoft/typesgen

A tool for building OpenAPI declarations, MongoDB schemas, and JDV validation rules from TypeScript type definitions.

Describe your business entities one time as TypeScript types and use `typesgen` to automatically generate:

- OpenAPI declarations for API contracts;
- MongoDB validation schemas;
- [JDV](https://www.npmjs.com/package/js-data-validator) validation rules.

## Installation

```bash
$ npm i --save @peassoft/typesgen
```

## Command Line Interface

```
Usage typesgen [options]

Options:
  -h --help            Display this usage info
  -s --source=<path>   (REQUIRED) Absolute or relative path to source file
  -d --dest=<path>     Absolute or relative path to the folder where to place
                       generated files with default names. Must be present if
                       separate destination paths are not provided.
                       If at least one separate destination path is provided,
                       this setting is ignored
  -o --openapi=<path>  Absolute or relative path to the file which OpenAPI
                       descriptions should be generated into
  -m --mongodb=<path>  Absolute or relative path to the file which MongoDB
                       validation schemas should be generated into
  -j --jdv=<path>      Absolute or relative path to the file which JDV
                       validation schemas should be generated into
```

## API

Hybrid module, load either with `import` or `require()`.

```js
import { typesgen } from '@peassoft/typesgen';
// or
const { typesgen } = require('@peassoft/typesgen');
```

### `typesgen(config) -> void`

```typescript
type Config = {
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
```

## Usage Details

If you need to process more than one file with TypeScript definitions, run `typesgen` against each file separately with different destination configs.

What is supported:

* type aliases of object type;
* string enums with each member initialized with a string literal.

If top-level declaration has `export` keyword, this entity will be emitted.

Each object type member can express `nullability` by declaring a union type with the second type of the union being `null`.

```typescript
type MyType = {
  foo: string | null;
  bar: Record<string, boolean> | null; // OK
  // baz: Record<string, boolean | null>; // Not supported
};
```

For arrays, only square brackets syntax is supported.

```typescript
type MyType = {
  foo: number[]; // OK
  // bar: Array<number>; // Not supported
};
```

Integer numbers

Some emit targets support integers and float numbers separately. Though, Typescript does not. To provide support for integers, use this approach:

1. Declare a non-public type alias named exactly `Integer`.
2. Use type `Integer` in place of `number` when integer is needed.

Example:
```Typescript
type Integer = number; // Actually, any primitive value will work. Only name Integer is used.

export type Foo = {
  bar: Integer;
  baz: Integer[] | null;
};
```

Date strings and UUIDs

Some emit targets support recognizing string values as dates in ISO format of UUIDs. You can use the same apprache as with integers:

```Typescript
type ISODateString = string; // Name matters, type does not.
type UUID = string; // Name matters, type does not.

export type Foo = {
  bar: ISODateString;
  baz: UUID;
  bar1: Record<ISODateString, number>;
  baz1: Record<UUID, number>;
};
```

Record type

This is the only Typescript's utility type supported. Although, with one restriction: the first type argument must be `string`, `ISODateString`, or `UUID`;


What is NOT supported:
* Union types, except those used to express `nullability` (see above).
* Intersection types.
* Interfaces.
* Type `null`, except when used as the second type in a union type to express `nullability` (see above).
* Type `undefined`.
* All built-in utility types, except `Record`.


MongoDB:

If an object property has its original type of`Record`, this property will have `bsonType` of `object` without any deeper property descriptor.
