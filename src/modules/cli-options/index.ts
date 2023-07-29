import { program } from 'commander';

// TODO Find a solution for description and version settings
// import pkg from '../../../package.json' assert { type: 'json' };
import type { Config } from '../../types.js';

export function parseCliOptions(): Config {
  program
    .name('typesgen')
    // .description(pkg.description)
    // .version(pkg.version)
    .requiredOption(
      '-s, --source <path_to_file>',
      'absolute or relative path to source file',
    )
    .option(
      '-d, --dest <path_to_folder>',
      'absolute or relative path to destination folder',
    )
    .option(
      '-o, --openapi <path_to_file>',
      'absolute or relative path to destination file for OpenAPI',
    )
    .option(
      '-m, --mongodb <path_to_file>',
      'absolute or relative path to destination file for MongoDB',
    )
    .option(
      '-j, --jdv <path_to_file>',
      'absolute or relative path to destination file for JDV',
    );

  program.parse();

  const options = program.opts();

  if (!options.source || typeof options.source !== 'string') {
    // TS hassle. Commander's requiredOption guarantees the option is present here
    throw new Error('unexpected error');
  }

  return {
    sourceFilePath: options.source,
    destFolderPath: normalizePathOption(options.dest),
    openapiDestPath: normalizePathOption(options.openapi),
    mongodbDestPath: normalizePathOption(options.mongodb),
    jdvDestPath: normalizePathOption(options.jdv),
  };
}

function normalizePathOption(path: unknown): string | undefined {
  return typeof path === 'string' && path ? path : undefined;
}
