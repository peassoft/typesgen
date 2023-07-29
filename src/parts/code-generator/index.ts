import fs from 'node:fs';
import path from 'node:path';

import type { Entity, InnerConfig } from '../../types.js';
import generateOpenApi from './open-api/index.js';
import generateMongoDb from './mongo-db/index.js';
import generateJdv from './jdv/index.js';

export class CodeGenerator {
  #entities: Set<Entity>;
  #config: InnerConfig;

  constructor(entities: Set<Entity>, config: InnerConfig) {
    this.#entities = entities;
    this.#config = config;
  }

  openApi(): void {
    if (!this.#config.openapiDestAbsPath) return;

    const result = generateOpenApi(this.#entities);
    fs.mkdirSync(path.dirname(this.#config.openapiDestAbsPath), { recursive: true });
    fs.writeFileSync(this.#config.openapiDestAbsPath, result);
  }

  mongoDb(): void {
    if (!this.#config.mongodbDestAbsPath) return;

    const result = generateMongoDb(this.#entities);
    fs.mkdirSync(path.dirname(this.#config.mongodbDestAbsPath), { recursive: true });
    fs.writeFileSync(this.#config.mongodbDestAbsPath, result);
  }

  jdv(): void {
    if (!this.#config.jdvDestAbsPath) return;

    const result = generateJdv(this.#entities);
    fs.mkdirSync(path.dirname(this.#config.jdvDestAbsPath), { recursive: true });
    fs.writeFileSync(this.#config.jdvDestAbsPath, result);
  }
}
