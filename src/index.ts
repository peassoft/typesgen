/**
 * A tool for building OpenAPI declarations, MongoDB schemas, and JDV validation rules
 * from TypeScript type definitions
 *
 * @packageDocumentation
 */

import type { Config } from './types.js';
import { createAppInnerConfig } from './modules/app-config/index.js';
import { parse } from './parts/parser/index.js';
import { transform } from './parts/transformer/index.js';
import { CodeGenerator } from './parts/code-generator/index.js';

export type { Config } from './types.js';

/**
 * Main entry point function for the module
 *
 * @public
 */
export function typesgen(config: Config): void {
  const innerConfig = createAppInnerConfig(config);

  const ast = parse(innerConfig.sourceFileAbsPath);

  const entities = transform(ast);

  const codeGenerator = new CodeGenerator(entities, innerConfig);

  codeGenerator.openApi();
  codeGenerator.mongoDb();
  codeGenerator.jdv();
}
