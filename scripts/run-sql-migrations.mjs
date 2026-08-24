#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const seedsDir = path.join(projectRoot, 'database', 'seeds');
const migrationsDir = path.join(projectRoot, 'database', 'migrations');

function parseArgs(argv) {
  const args = {
    dryRun: false,
    from: undefined,
    to: undefined,
  };

  for (const arg of argv) {
    if (arg === '--dry-run') {
      args.dryRun = true;
      continue;
    }

    const [key, value] = arg.split('=');
    if (key === '--from') args.from = Number(value);
    if (key === '--to') args.to = Number(value);
  }

  if (args.from !== undefined && !Number.isInteger(args.from)) {
    throw new Error('--from must be an integer migration prefix');
  }

  if (args.to !== undefined && !Number.isInteger(args.to)) {
    throw new Error('--to must be an integer migration prefix');
  }

  return args;
}

function migrationNumber(filename) {
  const match = filename.match(/^(\d+)-.+(?:\.sql)?$/);
  return match ? Number(match[1]) : null;
}

function listSqlFiles(dir, namespace, { from, to }) {
  if (!fs.existsSync(dir)) return [];

  const filenames = fs.readdirSync(dir);
  const hasConsolidatedMunicipalitiesSeed =
    namespace === 'seeds' && filenames.includes('02-municipalities.sql');

  return fs
    .readdirSync(dir)
    .filter((filename) => /^\d+-.+(?:\.sql)?$/.test(filename))
    .filter((filename) => {
      if (!hasConsolidatedMunicipalitiesSeed) return true;
      return !filename.startsWith('02-municipalities-part-');
    })
    .filter((filename) => {
      const number = migrationNumber(filename);
      return (
        number !== null &&
        (from === undefined || number >= from) &&
        (to === undefined || number <= to)
      );
    })
    .sort((a, b) => migrationNumber(a) - migrationNumber(b) || a.localeCompare(b))
    .map((filename) => ({
      name: `${namespace}/${filename}`,
      path: path.join(dir, filename),
    }));
}

function listMigrationFiles(args) {
  return [
    ...listSqlFiles(seedsDir, 'seeds', args),
    ...listSqlFiles(migrationsDir, 'migrations', args),
  ];
}

async function ensureMigrationTable(client) {
  await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      migration_name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function getExecutedMigrations(client) {
  const result = await client.query('SELECT migration_name FROM schema_migrations');
  return new Set(result.rows.map((row) => row.migration_name));
}

async function runMigration(client, file) {
  const sql = fs.readFileSync(file.path, 'utf8');

  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query(
      'INSERT INTO schema_migrations (migration_name) VALUES ($1) ON CONFLICT DO NOTHING',
      [file.name],
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = listMigrationFiles(args);

  if (files.length === 0) {
    console.log('No migration files matched.');
    return;
  }

  if (args.dryRun) {
    console.log('Matched migration files:');
    for (const file of files) console.log(`- ${file.name}`);
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  const shouldUseSsl =
    !databaseUrl.includes('localhost') &&
    !databaseUrl.includes('127.0.0.1') &&
    !databaseUrl.includes('@postgres:') &&
    !databaseUrl.includes('sslmode=disable');

  const client = new Client({
    connectionString: databaseUrl,
    ssl: shouldUseSsl ? { rejectUnauthorized: true } : false,
  });

  await client.connect();
  try {
    await ensureMigrationTable(client);
    const executed = await getExecutedMigrations(client);
    const pending = files.filter((file) => !executed.has(file.name));

    if (pending.length === 0) {
      console.log('No pending migrations.');
      return;
    }

    for (const file of pending) {
      process.stdout.write(`Running ${file.name}... `);
      await runMigration(client, file);
      console.log('ok');
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
