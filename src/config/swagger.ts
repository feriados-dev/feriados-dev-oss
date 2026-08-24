export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'feriados.dev open source',
    version: '1.0.0',
    description: 'API REST open source para feriados nacionais, estaduais e municipais do Brasil.',
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  tags: [
    { name: 'Health', description: 'Status da API e do banco de dados' },
    { name: 'Holidays', description: 'Consulta de feriados' },
    { name: 'Locations', description: 'Consulta de localidades brasileiras' },
    { name: 'Business Days', description: 'Calculo de dias uteis' },
    { name: 'Calendar', description: 'Calendario mensal por localidade' },
    { name: 'Data', description: 'Metadados e changelog dos dados' },
    { name: 'Changelog', description: 'Changelog publico da API' },
  ],
  components: {
    schemas: {
      Holiday: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string', example: 'Natal' },
          date: { type: 'string', format: 'date', example: '2026-12-25' },
          year: { type: 'integer', example: 2026 },
          type: {
            type: 'string',
            enum: ['national', 'state', 'municipal', 'optional'],
            example: 'national',
          },
          description: { type: 'string' },
          isFixed: { type: 'boolean', example: true },
        },
      },
      Location: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          type: {
            type: 'string',
            enum: ['country', 'state', 'municipality'],
            example: 'municipality',
          },
          code: { type: 'string', example: 'SP-SAO-PAULO' },
          name: { type: 'string', example: 'Sao Paulo' },
          stateCode: { type: 'string', example: 'SP' },
          ibgeCode: { type: 'string', example: '3550308' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'error' },
          message: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Status geral da API',
        responses: {
          '200': { description: 'API saudavel' },
          '503': { description: 'API indisponivel' },
        },
      },
    },
    '/v1/holidays': {
      get: {
        tags: ['Holidays'],
        summary: 'Busca feriados com filtros',
        parameters: [
          { name: 'year', in: 'query', schema: { type: 'integer', example: 2026 } },
          { name: 'location', in: 'query', schema: { type: 'string', example: 'SP-SAO-PAULO' } },
          { name: 'type', in: 'query', schema: { type: 'string', enum: ['national', 'state', 'municipal', 'optional'] } },
        ],
        responses: {
          '200': { description: 'Lista de feriados' },
        },
      },
    },
    '/v1/holidays/year/{year}': {
      get: {
        tags: ['Holidays'],
        summary: 'Lista feriados de um ano',
        parameters: [
          { name: 'year', in: 'path', required: true, schema: { type: 'integer', example: 2026 } },
          { name: 'location', in: 'query', schema: { type: 'string', example: 'BR' } },
        ],
        responses: {
          '200': { description: 'Lista de feriados do ano' },
        },
      },
    },
    '/v1/holidays/next': {
      get: {
        tags: ['Holidays'],
        summary: 'Lista proximos feriados',
        parameters: [
          { name: 'location', in: 'query', schema: { type: 'string', example: 'SP' } },
          { name: 'limit', in: 'query', schema: { type: 'integer', example: 5 } },
        ],
        responses: {
          '200': { description: 'Proximos feriados' },
        },
      },
    },
    '/v1/locations': {
      get: {
        tags: ['Locations'],
        summary: 'Lista localidades',
        responses: {
          '200': { description: 'Lista de localidades' },
        },
      },
    },
    '/v1/locations/states': {
      get: {
        tags: ['Locations'],
        summary: 'Lista estados brasileiros',
        responses: {
          '200': { description: 'Lista de estados' },
        },
      },
    },
    '/v1/locations/municipalities': {
      get: {
        tags: ['Locations'],
        summary: 'Lista municipios',
        parameters: [
          { name: 'state', in: 'query', schema: { type: 'string', example: 'SP' } },
        ],
        responses: {
          '200': { description: 'Lista de municipios' },
        },
      },
    },
    '/v1/business-days': {
      get: {
        tags: ['Business Days'],
        summary: 'Conta dias uteis entre duas datas',
        parameters: [
          { name: 'from', in: 'query', required: true, schema: { type: 'string', format: 'date' } },
          { name: 'to', in: 'query', required: true, schema: { type: 'string', format: 'date' } },
          { name: 'location', in: 'query', schema: { type: 'string', example: 'BR' } },
        ],
        responses: {
          '200': { description: 'Resultado do calculo' },
        },
      },
    },
    '/v1/calendar/month': {
      get: {
        tags: ['Calendar'],
        summary: 'Calendario mensal por localidade',
        parameters: [
          { name: 'year', in: 'query', required: true, schema: { type: 'integer', example: 2026 } },
          { name: 'month', in: 'query', required: true, schema: { type: 'integer', example: 4 } },
          { name: 'location', in: 'query', schema: { type: 'string', example: 'SP-SAO-PAULO' } },
        ],
        responses: {
          '200': { description: 'Calendario do mes' },
        },
      },
    },
    '/v1/data/status': {
      get: {
        tags: ['Data'],
        summary: 'Status de cobertura dos dados',
        responses: {
          '200': { description: 'Status dos dados' },
        },
      },
    },
    '/v1/changelog': {
      get: {
        tags: ['Changelog'],
        summary: 'Changelog publico da API',
        responses: {
          '200': { description: 'Entradas de changelog' },
        },
      },
    },
  },
};
