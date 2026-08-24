# Como contribuir

Obrigado por considerar contribuir com o Feriados Brasil API.

Este projeto tem um escopo deliberadamente pequeno: API self-hosted, Brasil-only, sem cadastro, API keys, billing ou recursos comerciais.

## Tipos de contribuicao

Contribuicoes bem-vindas:

- Correcao de feriados nacionais, estaduais ou municipais.
- Inclusao de feriados municipais faltantes com fonte verificavel.
- Correcoes de bugs na API.
- Melhorias de documentacao e exemplos.
- Melhorias no Docker, testes e fluxo de desenvolvimento.

Fora de escopo por enquanto:

- Autenticacao, billing, planos, quotas ou portal comercial.
- Expansao multi-pais.
- Dados promocionais, marketing dates ou eventos de impacto.
- Mudancas grandes de arquitetura sem discussao previa.

## Antes de abrir um PR

1. Abra uma issue se a mudanca for grande, ambigua ou envolver dados controversos.
2. Rode a aplicacao localmente com Docker.
3. Rode as validacoes locais.
4. Inclua fonte oficial quando alterar dados de feriados.

```bash
npm install
npm run lint
npm run build
npm test
```

Para testar o bootstrap completo:

```bash
docker compose down -v
docker compose up --build
```

## Padrao para dados

Toda mudanca de dados deve:

- Usar SQL em `database/migrations/`.
- Ser idempotente.
- Preservar dados existentes quando possivel.
- Citar uma fonte oficial ou municipal/estadual confiavel no PR.
- Explicar localidade, data, tipo e motivo da alteracao.

Tipos aceitos em `holidays.type`:

- `national`
- `state`
- `municipal`
- `optional`

Codigos de localidade:

- Pais: `BR`
- Estado: `SP`, `RJ`, `MG`
- Municipio: `SP-sao-paulo`, `RJ-rio-de-janeiro`

## Fluxo recomendado com IA

Este repo aceita contribuicoes feitas com apoio de IA, desde que revisadas por uma pessoa. Use o fluxo em [docs/AI_SDLC.md](docs/AI_SDLC.md).

Regra pratica: IA pode ajudar a gerar codigo, testes e SQL, mas a responsabilidade pela fonte dos dados e pela revisao final e humana.

## Pull requests

Um bom PR deve ter:

- Descricao curta do problema.
- Resumo da solucao.
- Como foi testado.
- Fonte dos dados, quando aplicavel.
- Risco ou limitacao conhecida.

Evite misturar refactor, dados e mudanca de comportamento no mesmo PR.

## Estilo

- TypeScript com tipagem explicita quando melhora clareza.
- Codigo simples, proximo dos padroes ja existentes.
- Comentarios apenas quando explicam uma decisao nao obvia.
- SQL legivel e idempotente.

## Relatando problemas

Use os templates em `.github/ISSUE_TEMPLATE/`:

- Bug da API.
- Correcao de dado.
- Pedido de feriado/localidade.
