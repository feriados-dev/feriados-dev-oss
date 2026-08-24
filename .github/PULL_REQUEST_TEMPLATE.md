## Resumo

Descreva a mudanca em poucas linhas.

## Tipo

- [ ] Bug fix
- [ ] Correcao de dado
- [ ] Novo dado de feriado
- [ ] Documentacao
- [ ] Infra/dev tooling

## Fonte dos dados

Obrigatorio para mudancas em `database/`.

## Validacoes

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm test`
- [ ] `npm run migrate -- --dry-run`
- [ ] `npm run smoke` se a API local estiver rodando
- [ ] `docker compose down -v && docker compose up --build`

## Uso de IA

- [ ] Usei IA para ajudar nesta mudanca.
- [ ] Nao usei IA para ajudar nesta mudanca.

Se usou IA:

- Ferramenta:
- Prompts ou contexto usados:
- Partes revisadas manualmente:

## Checklist

- [ ] Mudanca pequena e focada.
- [ ] Revisei o diff completo.
- [ ] Entendi e validei qualquer mudanca gerada por IA.
- [ ] SQL e idempotente, se aplicavel.
- [ ] Nao reintroduz auth, billing, planos, quotas ou Stripe.
- [ ] Atualizei docs, se necessario.
