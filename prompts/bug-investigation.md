# Bug investigation prompt

Use this prompt to investigate a wrong API response or failing test.

```text
You are working in the feriados.dev open source repository.

Bug:
- Endpoint:
- Request:
- Expected result:
- Actual result:
- Affected location/year:

Instructions:
- Read AGENTS.md and docs/API_CONTEXT_FOR_AI.md first.
- Reproduce the issue with the smallest possible test or curl command.
- Read the matching route, controller, service, repository and existing tests.
- Explain the root cause before editing.
- Make the smallest safe fix.
- Update OpenAPI or README only if the public contract changes.
- Do not reintroduce auth, billing, API keys, plans, quotas or Stripe.

Validation:
- Run the narrowest failing test first.
- Then run npm run lint, npm run build and npm test.
```
