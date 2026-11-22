import dotenv from 'dotenv';
import assert from 'node:assert';

dotenv.config();

export const token = process.env['DISCORD_TOKEN']!;
assert(token, "DISCORD_TOKEN environment variable is not set");

export const ownerId = process.env['OWNER_ID']!;
assert(ownerId, "OWNER_ID environment variable is not set");