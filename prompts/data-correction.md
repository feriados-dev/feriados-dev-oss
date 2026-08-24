# Data correction prompt

Use this prompt to add or correct holiday data.

```text
You are working in the feriados.dev open source repository.

Task:
Add or correct the holiday data below using the smallest safe change.

Holiday:
- Location code:
- Date:
- Year:
- Name:
- Type: national | state | municipal | optional
- Source URL:
- Source notes:

Rules:
- Read AGENTS.md and docs/API_CONTEXT_FOR_AI.md first.
- Use an idempotent SQL migration under database/migrations/.
- Do not edit already-applied migrations unless there is no safer alternative.
- Do not change unrelated years, states or municipalities.
- Keep location codes stable.
- Include a verification query or API smoke command in the PR notes.
- Do not reintroduce auth, billing, API keys, plans, quotas or Stripe.

Validation:
- npm run migrate -- --dry-run
- npm run lint
- npm run build
- npm test
```
