import fs from 'node:fs';

import { parseCliOptions } from '../src/modules/cli-options/index.js';
import { createAppInnerConfig } from '../src/modules/app-config/index.js';
import { parse } from '../src/parts/parser/index.js';
import { transform } from '../src/parts/transformer/index.js';
import { CodeGenerator } from '../src/parts/code-generator/index.js';

try {
  const config = parseCliOptions();
  const innerConfig = createAppInnerConfig(config);

  const ast = parse(innerConfig.sourceFileAbsPath);

  const entities = transform(ast);

  console.log('\n');

  for (const entity of entities) {
    console.dir(entity, { depth: 10 });
  }

  const codeGenerator = new CodeGenerator(entities, innerConfig);

  if (innerConfig.openapiDestAbsPath) {
    codeGenerator.openApi();
    const result = fs.readFileSync(innerConfig.openapiDestAbsPath, 'utf-8');
    console.log('*** OpenAPI ***');
    console.log(result);
  }

  if (innerConfig.mongodbDestAbsPath) {
    codeGenerator.mongoDb();
    const result = fs.readFileSync(innerConfig.mongodbDestAbsPath, 'utf-8');
    console.log('*** MongoDB ***');
    console.log(result);
  }

  if (innerConfig.jdvDestAbsPath) {
    codeGenerator.jdv();
    const result = fs.readFileSync(innerConfig.jdvDestAbsPath, 'utf-8');
    console.log('*** JDV ***');
    console.log(result);
  }
} catch (err) {
  console.error(err);
}
