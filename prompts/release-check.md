# Release check prompt

Use this prompt before creating a release tag.

```text
Act as release engineer for feriados.dev open source.

Goal:
Assess whether this repository is ready for a public release.

Check:
- git status and recent commits;
- package version and changelog state;
- README quickstart accuracy;
- AGENTS.md, AI docs and prompts;
- OpenAPI coverage against actual routes;
- Docker build and clean-volume startup;
- npm run lint;
- npm run build;
- npm test;
- npm run migrate -- --dry-run;
- npm run smoke against a running API;
- npm audit --omit=dev;
- no auth, billing, plans, quotas, API keys, checkout or Stripe code paths.

Output:
- Release readiness: ready / not ready.
- Blocking issues.
- Recommended improvements.
- Commands executed and results.
- Residual risks.
```
