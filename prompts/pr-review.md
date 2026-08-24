# PR review prompt

Use this prompt to review changes as a maintainer.

```text
Review this diff as a maintainer of feriados.dev open source.

Review priorities:
- Incorrect holiday dates, names, types or location scope.
- Non-idempotent SQL migrations.
- Behavior regressions in holiday hierarchy, business days, calendars or iCal.
- Missing or weak data sources.
- API contract drift between code, README and OpenAPI.
- Missing tests or missing smoke checks.
- Any reintroduction of commercial features such as auth, billing, plans,
  quotas, API keys, checkout or Stripe.

Output format:
- Findings first, ordered by severity.
- Include exact file and line references where possible.
- Keep summaries short.
- If there are no findings, say that clearly and mention residual test or data
  risks.
```
