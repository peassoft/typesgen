import path from 'node:path';

import type { Config, InnerConfig } from '../../types.js';

const defaultFileNames = {
  openapi: 'openapi.js',
  mongodb: 'mongodb.js',
  jdv: 'jdv.js',
};

export function createAppInnerConfig(config: Config): InnerConfig {
  const sourceFileAbsPath = createAbsPath(config.sourceFilePath);

  if (
    !config.openapiDestPath &&
    !config.mongodbDestPath &&
    !config.jdvDestPath
  ) {
    if (config.destFolderPath) {
      const base = createAbsPath(config.destFolderPath);

      return {
        sourceFileAbsPath,
        openapiDestAbsPath: path.join(base, defaultFileNames.openapi),
        mongodbDestAbsPath: path.join(base, defaultFileNames.mongodb),
        jdvDestAbsPath: path.join(base, defaultFileNames.jdv),
      };
    }

    return {
      sourceFileAbsPath,
    };
  }

  return {
    sourceFileAbsPath,
    ...config.openapiDestPath ? { openapiDestAbsPath: createAbsPath(config.openapiDestPath) } : {},
    ...config.mongodbDestPath ? { mongodbDestAbsPath: createAbsPath(config.mongodbDestPath) } : {},
    ...config.jdvDestPath ? { jdvDestAbsPath: createAbsPath(config.jdvDestPath) } : {},
  };
}

function createAbsPath(configPath: string): string {
  if (path.isAbsolute(configPath)) return configPath;

  return path.resolve(process.cwd(), configPath);
}
