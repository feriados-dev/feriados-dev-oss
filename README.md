# feriados.dev open source

API REST open source para consulta de feriados nacionais, estaduais e municipais do Brasil.

Versao Brasil-only, self-hosted e sem cadastro, API keys, billing ou limites comerciais.

Este repo tambem e preparado para contribuicao assistida por IA: inclui
instrucoes para agentes, prompts versionados, playbooks de manutencao de dados,
OpenAPI e validacoes executaveis.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Runtime | Node.js / TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| Cache | In-memory TTL cache |
| Container | Docker / Docker Compose |

## Rodando com Docker

```bash
cp .env.example .env
docker compose up --build
```

A API ficara disponivel em:

```text
http://localhost:3000/v1
http://localhost:3000/health
http://localhost:3000/api-docs
```

O `docker-compose.yml` sobe PostgreSQL e API. O schema inicial e os seeds em `database/` populam país, estados, municipios e feriados.

Para validar uma instancia rodando:

```bash
npm run smoke
```

## Rodando localmente

```bash
npm install
cp .env.example .env
npm run docker:up
npm run dev
```

## Endpoints

Todos os endpoints de dados sao publicos no deploy self-hosted.

### Feriados

```text
GET /v1/holidays
GET /v1/holidays/year/:year
GET /v1/holidays/next
GET /v1/holidays/long-weekends
GET /v1/holidays/compare
GET /v1/holidays/range
GET /v1/holidays/ical
```

Exemplos:

```bash
curl "http://localhost:3000/v1/holidays/year/2026?page=1&limit=100"
curl "http://localhost:3000/v1/holidays/next?location=SP-SAO-PAULO&limit=5"
```

### Localizacoes

```text
GET /v1/locations
GET /v1/locations/states
GET /v1/locations/municipalities
GET /v1/locations/search?q=...
GET /v1/locations/code/:code
```

### Dias uteis

```text
GET /v1/business-days
GET /v1/business-days/add
GET /v1/business-days/next
GET /v1/business-days/is
```

Exemplo:

```bash
curl "http://localhost:3000/v1/business-days?from=2026-01-01&to=2026-12-31&location=SP-SAO-PAULO"
```

### Calendario

```text
GET /v1/calendar/month
```

Exemplo:

```bash
curl "http://localhost:3000/v1/calendar/month?location=SP-SAO-PAULO&year=2026&month=4"
```

### Eventos de impacto

Eventos de impacto nao sao feriados oficiais. Eles representam datas que podem
afetar operacoes, mobilidade, atendimento, turismo, comercio ou demanda.

```text
GET /v1/impact-events
GET /v1/impact-events/next
GET /v1/impact-events/:id
```

Exemplos:

```bash
curl "http://localhost:3000/v1/impact-events?year=2026&impactLevel=high"
curl "http://localhost:3000/v1/impact-events/next?country=BR&limit=5"
```

### Dados e changelog

```text
GET /v1/data/status
GET /v1/data/changelog
GET /v1/data/changelog.rss
GET /v1/changelog
GET /v1/changelog.rss
```

### Health

```text
GET /health
GET /health/liveness
GET /health/readiness
```

## Scripts

```bash
npm run dev
npm run build
npm test
npm run lint
npm run smoke
npm run docker:up
npm run docker:down
```

## Uso com IA

O projeto possui arquivos pensados para Codex, Claude Code, Cursor, Copilot
Workspace e outras ferramentas de desenvolvimento assistido por IA.

- [Instrucoes para agentes](AGENTS.md)
- [Claude Code](CLAUDE.md)
- [GitHub Copilot](.github/copilot-instructions.md)
- [Cursor](.cursor/rules/feriados-dev.mdc)
- [llms.txt](llms.txt)
- [Contexto da API para IA](docs/API_CONTEXT_FOR_AI.md)
- [Playbook de IA](docs/AI_PLAYBOOK.md)
- [AI SDLC](docs/AI_SDLC.md)
- [Prompts versionados](prompts/)
- [OpenAPI](docs/openapi/feriados-v1.openapi.yaml)

Fluxos cobertos:

- correcao de dados de feriados;
- revisao de PRs;
- investigacao de bugs;
- checklist de release;
- smoke tests para validar uma instancia local.

## Comunidade

- [Como contribuir](CONTRIBUTING.md)
- [Seguranca](SECURITY.md)
- [Codigo de Conduta](CODE_OF_CONDUCT.md)
- [AI SDLC](docs/AI_SDLC.md)
- [AI Playbook](docs/AI_PLAYBOOK.md)
- [Licenca MIT](LICENSE)

## Dados

Os dados atuais ficam versionados em SQL dentro de `database/`.

- `database/init.sql`: schema base e estados brasileiros.
- `database/seeds/`: municipios, feriados nacionais, estaduais e municipais.
- `database/migrations/`: correcoes e expansoes incrementais dos dados.

## Licenca

MIT.
