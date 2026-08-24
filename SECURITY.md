# Seguranca

## Escopo

Este projeto e uma API self-hosted. Nao existe cadastro, API key, billing, painel administrativo ou armazenamento de dados pessoais nesta versao OSS.

Mesmo assim, vulnerabilidades podem existir em:

- Endpoints HTTP.
- Configuracao Docker.
- Dependencias npm.
- Consultas SQL.
- Exposicao acidental de arquivos ou paths sensiveis.

## Como reportar

Se encontrar uma vulnerabilidade, nao abra uma issue publica com detalhes exploraveis.

Envie um email para:

```text
andre.nobre@andrenobre.pt
```

Inclua, se possivel:

- Descricao do problema.
- Passos para reproduzir.
- Impacto esperado.
- Versao/commit testado.
- Sugestao de mitigacao, se houver.

## Tempo de resposta

Como este e um projeto open source mantido de forma independente, a resposta nao tem SLA comercial.

Ainda assim, reports claros de seguranca terao prioridade sobre features e melhorias.

## Dependencias

Antes de reportar vulnerabilidades conhecidas de dependencias, rode:

```bash
npm audit
```

Se a correcao exigir upgrade breaking, abra uma issue ou PR explicando o impacto.
