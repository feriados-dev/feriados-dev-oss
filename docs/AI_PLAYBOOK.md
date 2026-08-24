# AI Playbook

This playbook contains repeatable workflows for using AI tools such as Codex,
Claude Code, Cursor, Copilot Workspace or ChatGPT with this repository.

## Add or correct a holiday

Use when a holiday is missing, has the wrong date, has the wrong scope or needs
updated source metadata.

1. Identify the affected location code, year, date, name and type.
2. Verify the source outside the model response.
3. Inspect existing data in `database/` and related tests.
4. Create an idempotent SQL migration under `database/migrations/`.
5. Include a verification query or smoke command in the PR.
6. Run:

```bash
npm run migrate -- --dry-run
npm run lint
npm run build
npm test
```

Prompt: `prompts/data-correction.md`.

## Review a data PR

Use when a PR changes `database/`, holiday classification or business-day
behavior.

Check:

- source quality and exact date;
- location scope;
- SQL idempotency;
- rollback risk;
- whether tests or smoke checks cover the changed behavior;
- whether unrelated years or locations changed.

Prompt: `prompts/pr-review.md`.

## Investigate an API bug

Use when an endpoint returns a wrong result or error.

1. Reproduce the issue with a minimal request.
2. Read the route, controller, service, repository and tests for that endpoint.
3. Add a failing test when practical.
4. Make the smallest code change that fixes the behavior.
5. Update OpenAPI or README if the public contract changed.

Prompt: `prompts/bug-investigation.md`.

## Prepare a release

Use before tagging a version.

1. Confirm the worktree has only intended changes.
2. Run lint, build, tests, migration dry-run and smoke tests.
3. Check `npm audit --omit=dev`.
4. Check Docker from a clean volume.
5. Review README, OpenAPI and changelog.
6. Confirm no commercial code paths were reintroduced.

Prompt: `prompts/release-check.md`.

## Add an endpoint

Use only when the endpoint meaningfully improves self-hosted usage.

1. Keep the route public and unauthenticated.
2. Add validation with Zod.
3. Keep response shape consistent with existing endpoints.
4. Add tests at controller/service level as appropriate.
5. Update OpenAPI, README and examples.
6. Add a public changelog entry.

## Improve documentation

Use when docs are confusing, incomplete or stale.

1. Prefer executable examples over prose-only explanation.
2. Keep quickstart paths short.
3. Make Docker the primary path for new users.
4. Keep AI-generated language direct and specific.
5. Run link/path checks manually when changing file references.
