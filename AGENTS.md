# Instructions for AI agents

This repository is the open source version of feriados.dev: a self-hosted,
Brazil-only API for national, state and municipal holidays.

## Product boundaries

- Keep the project focused on open source, self-hosted usage.
- Do not reintroduce commercial flows: auth, billing, plans, quotas, API keys,
  checkout, Stripe, customer portals or upgrade prompts.
- Public API endpoints should stay usable without registration.
- Prefer small, reviewable changes over broad rewrites.

## Data rules

- Holiday data changes must be source-backed.
- Prefer idempotent SQL migrations under `database/migrations/`.
- Keep existing location codes stable. Municipality codes use the
  `UF-MUNICIPIO-SLUG` pattern, for example `SP-SAO-PAULO`.
- Preserve the hierarchy: `BR` country holidays apply nationally, state
  holidays apply to that state, and municipal holidays apply only to that
  municipality.
- Do not change unrelated years, states or municipalities in a data PR.
- Include a verification query or API smoke check for data changes.

## Changelog

For features, fixes, improvements or breaking changes that affect API users,
add a changelog entry in the same PR:

```bash
npm run changelog:new -- --type improvement --title "Title" --tags api,data
```

Edit the generated file under `changelog/entries/`.

Docs-only, internal refactors and tests usually do not need a public changelog.

## Validation

Run the narrowest useful validation while working, then run the release checks
before handing off:

```bash
npm run lint
npm run build
npm test
npm run migrate -- --dry-run
npm run smoke
```

`npm run smoke` expects a running API, normally started with:

```bash
docker compose up --build
```

## Useful context

- `README.md`: user-facing quickstart and feature overview.
- `docs/API_CONTEXT_FOR_AI.md`: API domain model and common pitfalls.
- `docs/AI_PLAYBOOK.md`: task recipes for AI-assisted maintenance.
- `docs/AI_SDLC.md`: contribution workflow for AI-assisted changes.
- `docs/openapi/feriados-v1.openapi.yaml`: public API contract.
- `database/`: schema, seeds and data migrations.

## Review stance

When reviewing generated changes, prioritize:

- incorrect holiday scope or date;
- non-idempotent SQL;
- unstable or incomplete tests;
- API contract drift;
- undocumented data sources;
- accidental commercial functionality.
