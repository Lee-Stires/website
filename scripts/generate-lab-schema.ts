import { mkdirSync, writeFileSync } from 'node:fs';

import { z } from 'astro/zod';

import { blockSchema } from '../src/blocks/schema';

function assertMediaFieldsValid(node: unknown, path = '$'): void {
  if (!node || typeof node !== 'object') return;
  const record = node as Record<string, unknown>;
  if (
    record.format === 'image' &&
    Array.isArray(record.widths) &&
    typeof record.sizes !== 'string'
  ) {
    throw new Error(`${path}: image field declares "widths" but no "sizes"`);
  }
  for (const [key, value] of Object.entries(record)) {
    assertMediaFieldsValid(value, `${path}.${key}`);
  }
}

const jsonSchema = z.toJSONSchema(blockSchema);
assertMediaFieldsValid(jsonSchema);

mkdirSync('.lab', { recursive: true });
writeFileSync('.lab/schema.json', JSON.stringify(jsonSchema, null, 2));
