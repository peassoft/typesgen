import ts from 'typescript';

export function parse(srcFilePath: string): ts.SourceFile {
  const program = ts.createProgram([srcFilePath], {});
  const ast = program.getSourceFile(srcFilePath);

  if (!ast) {
    throw new Error(`could not find or process file ${srcFilePath}`);
  }

  return ast;
}
