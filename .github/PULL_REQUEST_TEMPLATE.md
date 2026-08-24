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
- [ ] `docker compose down -v && docker compose up --build`

## Checklist

- [ ] Mudanca pequena e focada.
- [ ] Revisei o diff completo.
- [ ] SQL e idempotente, se aplicavel.
- [ ] Nao reintroduz auth, billing, planos, quotas ou Stripe.
- [ ] Atualizei docs, se necessario.
