import type { Entity } from '../../../types.js';
import Generator from './generator.js';

export default function generateMongoDb(entities: Set<Entity>): string {
  const generator = new Generator(entities);
  return generator.generate();
}
