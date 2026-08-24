#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENTRIES_DIR = join(__dirname, '..', 'changelog', 'entries');

const VALID_TYPES = ['feature', 'improvement', 'fix', 'breaking', 'announcement'];

function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}

async function main() {
  const args = parseArgs();
  let { type, title, tags, summary } = args;

  if (!type || !title) {
    const rl = readline.createInterface({ input, output });
    if (!type) type = await rl.question(`Type (${VALID_TYPES.join('/')}): `);
    if (!title) title = await rl.question('Title: ');
    if (!summary) summary = await rl.question('Summary (single line, optional): ');
    if (!tags) tags = await rl.question('Tags (comma-separated, optional): ');
    rl.close();
  }

  if (!VALID_TYPES.includes(type)) {
    console.error(`Invalid type '${type}'. Allowed: ${VALID_TYPES.join(', ')}`);
    process.exit(1);
  }

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(title);
  const filename = `${date}-${slug}.md`;
  const path = join(ENTRIES_DIR, filename);

  if (existsSync(path)) {
    console.error(`File already exists: ${path}`);
    process.exit(1);
  }

  const tagList = (tags || '')
    .toString()
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const tagsLine = tagList.length ? `tags: [${tagList.join(', ')}]` : 'tags: []';
  const body = summary && summary !== true ? summary : 'Descreva aqui o lançamento.';

  const content = `---
date: ${date}
type: ${type}
title: ${title}
${tagsLine}
---
${body}
`;

  mkdirSync(ENTRIES_DIR, { recursive: true });
  writeFileSync(path, content);
  console.log(`Created ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
