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
    { name: 'Impact Events', description: 'Eventos de impacto operacional que nao sao feriados oficiais' },
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
      ImpactEvent: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          slug: { type: 'string', example: 'copa-2026-brasil-marrocos' },
          name: { type: 'string', example: 'Copa 2026: Brasil x Marrocos' },
          startsAt: { type: 'string', format: 'date-time' },
          endsAt: { type: 'string', format: 'date-time' },
          localDate: { type: 'string', format: 'date', example: '2026-06-13' },
          year: { type: 'integer', example: 2026 },
          category: {
            type: 'string',
            enum: ['sports', 'civic', 'infrastructure', 'cultural', 'commerce', 'weather', 'other'],
            example: 'sports',
          },
          impactLevel: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'critical'],
            example: 'high',
          },
          impactScope: {
            type: 'string',
            enum: ['national', 'state', 'municipality'],
            example: 'national',
          },
          impactType: { type: 'string', example: 'work_schedule_disruption' },
          countryCode: { type: 'string', example: 'BR' },
          locationCode: { type: 'string', example: 'SP-SAO-PAULO' },
          timezone: { type: 'string', example: 'America/Sao_Paulo' },
          businessImpactHint: { type: 'string' },
          isHoliday: { type: 'boolean', example: false },
          status: {
            type: 'string',
            enum: ['scheduled', 'tentative', 'cancelled'],
            example: 'scheduled',
          },
          sourceName: { type: 'string' },
          sourceUrl: { type: 'string' },
          metadata: { type: 'object' },
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
    '/v1/impact-events': {
      get: {
        tags: ['Impact Events'],
        summary: 'Busca eventos de impacto operacional',
        description: 'Eventos de impacto nao sao feriados oficiais. Eles indicam datas que podem afetar operacoes, mobilidade, demanda, turismo, comercio ou suporte.',
        parameters: [
          { name: 'year', in: 'query', schema: { type: 'integer', example: 2026 } },
          { name: 'country', in: 'query', schema: { type: 'string', example: 'BR' } },
          { name: 'category', in: 'query', schema: { type: 'string', enum: ['sports', 'civic', 'infrastructure', 'cultural', 'commerce', 'weather', 'other'] } },
          { name: 'impactLevel', in: 'query', schema: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] } },
          { name: 'impactScope', in: 'query', schema: { type: 'string', enum: ['national', 'state', 'municipality'] } },
          { name: 'location', in: 'query', schema: { type: 'string', example: 'SP-SAO-PAULO' } },
          { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date' } },
        ],
        responses: {
          '200': { description: 'Lista de eventos de impacto' },
        },
      },
    },
    '/v1/impact-events/next': {
      get: {
        tags: ['Impact Events'],
        summary: 'Proximos eventos de impacto operacional',
        parameters: [
          { name: 'country', in: 'query', schema: { type: 'string', example: 'BR' } },
          { name: 'limit', in: 'query', schema: { type: 'integer', example: 5 } },
        ],
        responses: {
          '200': { description: 'Proximos eventos de impacto' },
        },
      },
    },
    '/v1/impact-events/{id}': {
      get: {
        tags: ['Impact Events'],
        summary: 'Busca evento de impacto por UUID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        responses: {
          '200': { description: 'Evento de impacto' },
          '404': { description: 'Evento nao encontrado' },
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
