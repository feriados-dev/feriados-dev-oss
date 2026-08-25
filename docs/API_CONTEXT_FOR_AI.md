# API Context for AI

This document gives AI agents the domain context needed to work on
feriados.dev open source without rediscovering project rules from scratch.

## Purpose

feriados.dev open source is a Brazil-only, self-hosted REST API for holiday
lookups, business-day calculations, monthly calendars, impact events and
iCalendar export.

The OSS version has no authentication, API keys, billing, pricing, quota or
customer-management surface.

## Location model

Locations are hierarchical:

- `BR`: country.
- `UF`: Brazilian state, for example `SP`.
- `UF-MUNICIPIO-SLUG`: municipality, for example `SP-SAO-PAULO`.

Holiday applicability follows that hierarchy. A request for `SP-SAO-PAULO`
must include applicable national holidays, applicable state holidays from `SP`,
and municipal holidays attached to `SP-SAO-PAULO`.

## Holiday types

- `national`: applies at country level.
- `state`: applies to one or more states.
- `municipal`: applies to one or more municipalities.
- `optional`: optional date. Some optional dates affect business-day results;
  bridge-style optional dates may be shown as holidays but should not always
  make the day non-business. Check existing tests before changing this behavior.

## Impact events

Impact events are not official holidays. They describe operationally relevant
events that may affect support volume, mobility, tourism, commerce, logistics,
staffing or demand.

They are exposed under `/v1/impact-events` and use:

- `category`: `sports`, `civic`, `infrastructure`, `cultural`, `commerce`,
  `weather` or `other`.
- `impactLevel`: `low`, `medium`, `high` or `critical`.
- `impactScope`: `national`, `state` or `municipality`.
- `isHoliday`: normally `false`; use holiday endpoints for legal holidays.

## Common endpoint behavior

- Public API prefix: `/v1`.
- Dates are civil dates in `YYYY-MM-DD`.
- Pagination usually uses `page` and `limit`.
- Invalid input should return a structured 400 validation error.
- Most successful responses use:

```json
{
  "status": "success",
  "data": {},
  "meta": {}
}
```

List endpoints may also return `pagination`.

## Data maintenance principles

- Data changes should be source-backed and narrow.
- SQL migrations should be idempotent.
- Avoid deleting or rewriting historical data unless the source proves the
  existing data is wrong.
- Prefer adding corrective migrations over editing already-applied migration
  files.
- Add or update tests when behavior changes, not for every purely factual data
  row.

## Important commands

```bash
npm run lint
npm run build
npm test
npm run migrate -- --dry-run
docker compose up --build
npm run smoke
```

## Common pitfalls

- Do not use JavaScript local timezone conversion when comparing holiday dates.
  Treat `DATE` values as civil dates.
- Do not assume a municipality holiday applies to all municipalities in a state.
- Do not add commercial features back into the API.
- Do not update OpenAPI examples without checking the actual route parameters.
- Do not leave generated SQL, prompts or docs vague about sources.
