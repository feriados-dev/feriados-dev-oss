# AI SDLC

Este documento descreve um fluxo simples para usar IA no desenvolvimento do Feriados Brasil API.

O objetivo e acelerar manutencao sem reduzir rigor, principalmente em mudancas de dados.

## Principios

- Humano responsavel: todo PR gerado com IA deve ser revisado por uma pessoa.
- Fonte antes de SQL: dados de feriados precisam de fonte verificavel.
- Mudancas pequenas: prefira PRs focados e faceis de revisar.
- Teste local obrigatorio: codigo que nao roda localmente nao deve ser mergeado.
- Sem escopo comercial: nao reintroduzir auth, billing, planos, quotas ou Stripe.

## Fluxo recomendado

1. Definir o problema

Escreva em uma issue ou no PR:

- O que esta errado ou faltando.
- Qual localidade e ano sao afetados.
- Qual fonte sera usada.

2. Pedir ajuda da IA

Use prompts especificos. Exemplo:

```text
Analise este repo e crie uma migration SQL idempotente para adicionar o feriado municipal X em YYYY-MM-DD para LOCATION_CODE. Use o padrao existente em database/migrations e inclua um teste ou query de verificacao.
```

3. Revisar a saida

Verifique manualmente:

- A fonte confirma a data.
- O codigo de localidade existe em `locations`.
- A migration e idempotente.
- A mudanca nao altera outros anos/localidades sem necessidade.

4. Rodar validacoes

```bash
npm run lint
npm run build
npm test
docker compose down -v
docker compose up --build
```

5. Fazer verificacao funcional

Exemplos:

```bash
curl "http://localhost:3000/v1/holidays?year=2026&location=BR"
curl "http://localhost:3000/v1/business-days/is?date=2026-01-01&location=BR"
curl "http://localhost:3000/v1/calendar/month?location=SP-sao-paulo&year=2026&month=1"
```

6. Abrir PR

Inclua:

- Resumo.
- Fonte.
- Validacoes executadas.
- Risco conhecido.

## Checklist para PRs com IA

- [ ] Eu revisei o diff completo.
- [ ] Eu entendi a mudanca gerada.
- [ ] Eu removi codigo ou texto desnecessario.
- [ ] Eu confirmei as fontes dos dados.
- [ ] Eu rodei build/testes.
- [ ] Eu confirmei que nao reintroduz features comerciais.

## Prompts uteis

### Correcao de dado

```text
No repo Feriados Brasil API, adicione/corrija o feriado abaixo usando uma migration SQL idempotente. Mantenha escopo minimo e inclua uma query de verificacao.

Localidade:
Data:
Nome:
Tipo:
Fonte:
```

### Revisao de PR

```text
Revise este diff como mantenedor do Feriados Brasil API. Foque em bugs, regressao de dados, idempotencia SQL, cobertura de testes e qualquer reintroducao de features comerciais.
```

### Investigacao de bug

```text
Investigue por que o endpoint X retorna Y para o caso Z. Leia controllers, services, repositories e testes relacionados. Proponha a menor correcao possivel e como validar.
```
