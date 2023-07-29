import ts from 'typescript';
import { canHaveJsDoc, getJsDoc } from 'tsutils/util/index.js';

import {
  type Entity,
  type TempItem,
} from '../../types.js';

import normalizeComment from './normalize-comment.js';
import constructEntities from './construct-entities.js';

export function transform(ast: ts.SourceFile): Set<Entity> {
  const entities: Set<TempItem> = new Set();

  function traverseChildren(node: ts.Node, parent: TempItem): void {
    ts.forEachChild(node, node => {
      // console.log(syntaxToKind(node.kind));
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ts.Node, parent: TempItem): void {
    switch (syntaxToKind(node.kind)) {
      case 'SourceFile':
        traverseChildren(node, parent);
        break;

      case 'TypeAliasDeclaration': {
        const entity: TempItem = {};

        if (canHaveJsDoc(node)) {
          const jsDocs: ts.JSDoc[] = getJsDoc(node, ast);
          const jsDoc = jsDocs[0];

          if (jsDoc) {
            if (typeof jsDoc.comment === 'string') {
              entity.description = normalizeComment(jsDoc.comment);
            }
          }
        }

        entities.add(entity);
        traverseChildren(node, entity);

        break;
      }

      case 'EnumDeclaration': {
        const entity: TempItem = { type: 'enum' };

        if (canHaveJsDoc(node)) {
          const jsDocs: ts.JSDoc[] = getJsDoc(node, ast);
          const jsDoc = jsDocs[0];

          if (jsDoc) {
            if (typeof jsDoc.comment === 'string') {
              entity.description = normalizeComment(jsDoc.comment);
            }
          }
        }

        entities.add(entity);
        traverseChildren(node, entity);

        break;
      }

      case 'ExportKeyword':
        parent.public = true;
        break;

      case 'Identifier': {
        const n = node as ts.Identifier;
        const name = n.text;

        if (parent.type === 'type_reference') {
          if (name === 'Record') {
            parent.type = 'record';
            parent.recordParams = [];
          } else {
            parent.typeName = name;
          }
        } else {
          parent.name = name;
        }

        break;
      }

      case 'TypeLiteral': {
        switch (parent.type) {
          case 'record':
            if (Array.isArray(parent.recordParams)) {
              const recordParam = {
                type: 'object',
              };
              parent.recordParams.push(recordParam);
              traverseChildren(node, recordParam);
            }
            break;
          default:
            parent.type = 'object';
            traverseChildren(node, parent);
        }

        break;
      }

      case 'PropertySignature': {
        const entityMember: TempItem = {};

        if (canHaveJsDoc(node)) {
          const jsDocs: ts.JSDoc[] = getJsDoc(node, ast);
          const jsDoc = jsDocs[0];

          if (jsDoc) {
            if (typeof jsDoc.comment === 'string') {
              entityMember.description = normalizeComment(jsDoc.comment);
            }
          }
        }

        if (Array.isArray(parent.members)) {
          parent.members.push(entityMember);
        } else {
          parent.members = [entityMember];
        }

        traverseChildren(node, entityMember);

        break;
      }

      case 'EnumMember': {
        const enumMember: TempItem = {};

        if (canHaveJsDoc(node)) {
          const jsDocs: ts.JSDoc[] = getJsDoc(node, ast);
          const jsDoc = jsDocs[0];

          if (jsDoc) {
            if (typeof jsDoc.comment === 'string') {
              enumMember.description = normalizeComment(jsDoc.comment);
            }
          }
        }

        if (Array.isArray(parent.members)) {
          parent.members.push(enumMember);
        } else {
          parent.members = [enumMember];
        }

        traverseChildren(node, enumMember);

        break;
      }

      case 'QuestionToken':
        parent.optional = true;
        break;

      case 'NumberKeyword':
        switch (parent.type) {
          case 'array':
            parent.items = 'number';
            break;
          case 'record':
            if (Array.isArray(parent.recordParams)) {
              parent.recordParams.push({ type: 'number' });
            }
            break;
          default:
            parent.type = 'number';
        }
        break;

      case 'StringKeyword':
        switch (parent.type) {
          case 'array':
            parent.items = 'string';
            break;
          case 'record':
            if (Array.isArray(parent.recordParams)) {
              parent.recordParams.push({ type: 'string' });
            }
            break;
          default:
            parent.type = 'string';
        }
        break;

      case 'BooleanKeyword':
        switch (parent.type) {
          case 'array':
            parent.items = 'boolean';
            break;
          case 'record':
            if (Array.isArray(parent.recordParams)) {
              parent.recordParams.push({ type: 'boolean' });
            }
            break;
          default:
            parent.type = 'boolean';
        }
        break;

      case 'NullKeyword':
        parent.nullable = true;
        break;

      case 'UnionType':
        traverseChildren(node, parent);
        break;

      case 'LiteralType':
        traverseChildren(node, parent);
        break;

      case 'ArrayType': {
        const item: TempItem = {};

        switch (parent.type) {
          case 'record':
            if (Array.isArray(parent.recordParams)) {
              const recordParam = {
                type: 'array',
                items: [item],
              };
              parent.recordParams.push(recordParam);
            }
            break;
          default:
            parent.type = 'array';
            parent.items = [item];
        }

        traverseChildren(node, item);

        break;
      }

      case 'TypeReference': {
        switch (parent.type) {
          case 'record':
            if (Array.isArray(parent.recordParams)) {
              const recordParam = {
                type: 'type_reference',
              };
              parent.recordParams.push(recordParam);
              traverseChildren(node, recordParam);
            }
            break;
          default:
            parent.type = 'type_reference';
            traverseChildren(node, parent);
        }

        break;
      }

      case 'StringLiteral': {
        const n = node as ts.StringLiteral;

        if (n.text) {
          parent.text = n.text;
        }

        break;
      }
    }
  }

  traverseNode(ast, {});

  return constructEntities(entities);
}

function syntaxToKind(kind: ts.Node['kind']): string {
  return ts.SyntaxKind[kind];
}
