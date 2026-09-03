import { mkdirSync, writeFileSync } from 'node:fs';

import { z } from 'astro/zod';

import { blockSchema } from '../src/blocks/schema';

const jsonSchema = z.toJSONSchema(blockSchema);

mkdirSync('.lab', { recursive: true });
writeFileSync('.lab/schema.json', JSON.stringify(jsonSchema, null, 2));
