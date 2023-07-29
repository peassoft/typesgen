import { parseCliOptions } from '../modules/cli-options/index.js';
import { createAppInnerConfig } from '../modules/app-config/index.js';
import { parse } from '../parts/parser/index.js';
import { transform } from '../parts/transformer/index.js';
import { CodeGenerator } from '../parts/code-generator/index.js';

const config = parseCliOptions();
const innerConfig = createAppInnerConfig(config);

const ast = parse(innerConfig.sourceFileAbsPath);

const entities = transform(ast);

const codeGenerator = new CodeGenerator(entities, innerConfig);

codeGenerator.openApi();
codeGenerator.mongoDb();
codeGenerator.jdv();
