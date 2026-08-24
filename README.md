# Feriados Brasil API

API REST open source para consulta de feriados nacionais, estaduais e municipais do Brasil.

Esta versao e Brasil-only, self-hosted e sem cadastro, API keys, billing ou limites comerciais.

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

O `docker-compose.yml` sobe PostgreSQL e API. O schema inicial e os seeds em `database/` populam pais, estados, municipios e feriados.

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
npm run docker:up
npm run docker:down
```

## Comunidade

- [Como contribuir](CONTRIBUTING.md)
- [Seguranca](SECURITY.md)
- [Codigo de Conduta](CODE_OF_CONDUCT.md)
- [AI SDLC](docs/AI_SDLC.md)
- [Licenca MIT](LICENSE)

## Dados

Os dados atuais ficam versionados em SQL dentro de `database/`.

- `database/init.sql`: schema base e estados brasileiros.
- `database/seeds/`: municipios, feriados nacionais, estaduais e municipais.
- `database/migrations/`: correcoes e expansoes incrementais dos dados.

## Licenca

MIT.
