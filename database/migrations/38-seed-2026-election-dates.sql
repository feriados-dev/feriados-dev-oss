-- Datas oficiais de votação das Eleições Gerais de 2026.
-- O TSE padroniza a votação das 8h às 17h pelo horário de Brasília.
-- Estas datas são eventos cívicos, não feriados oficiais.
-- Fonte: Resolução TSE nº 23.751/2026.
-- https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-751-de-26-de-fevereiro-de-2026

INSERT INTO impact_events (
  slug,
  name,
  starts_at,
  ends_at,
  local_date,
  year,
  category,
  impact_level,
  impact_scope,
  impact_type,
  country_code,
  location_code,
  timezone,
  description,
  business_impact_hint,
  is_holiday,
  status,
  source_name,
  source_url,
  metadata
) VALUES
(
  'eleicoes-gerais-2026-primeiro-turno',
  'Eleições Gerais 2026 - primeiro turno',
  '2026-10-04 08:00:00-03',
  '2026-10-04 17:00:00-03',
  '2026-10-04',
  2026,
  'civic',
  'high',
  'national',
  'voting',
  'BR',
  NULL,
  'America/Sao_Paulo',
  'Primeiro turno das Eleições Gerais de 2026, com votação das 8h às 17h pelo horário de Brasília.',
  'Pode afetar expediente, mobilidade, atendimento e operações de serviços em todo o país durante o horário de votação.',
  false,
  'scheduled',
  'Tribunal Superior Eleitoral',
  'https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-751-de-26-de-fevereiro-de-2026',
  '{"election":"Eleições Gerais 2026","round":1,"votingHours":{"start":"08:00","end":"17:00","timezone":"Brasília"}}'::jsonb
),
(
  'eleicoes-gerais-2026-segundo-turno',
  'Eleições Gerais 2026 - segundo turno',
  '2026-10-25 08:00:00-03',
  '2026-10-25 17:00:00-03',
  '2026-10-25',
  2026,
  'civic',
  'high',
  'national',
  'voting',
  'BR',
  NULL,
  'America/Sao_Paulo',
  'Segundo turno das Eleições Gerais de 2026, realizado onde houver, com votação das 8h às 17h pelo horário de Brasília.',
  'Onde houver segundo turno, pode afetar expediente, mobilidade, atendimento e operações de serviços durante o horário de votação.',
  false,
  'scheduled',
  'Tribunal Superior Eleitoral',
  'https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-751-de-26-de-fevereiro-de-2026',
  '{"election":"Eleições Gerais 2026","round":2,"conditional":true,"votingHours":{"start":"08:00","end":"17:00","timezone":"Brasília"}}'::jsonb
)
ON CONFLICT (slug, country_code) DO UPDATE SET
  name = EXCLUDED.name,
  starts_at = EXCLUDED.starts_at,
  ends_at = EXCLUDED.ends_at,
  local_date = EXCLUDED.local_date,
  year = EXCLUDED.year,
  category = EXCLUDED.category,
  impact_level = EXCLUDED.impact_level,
  impact_scope = EXCLUDED.impact_scope,
  impact_type = EXCLUDED.impact_type,
  location_code = EXCLUDED.location_code,
  timezone = EXCLUDED.timezone,
  description = EXCLUDED.description,
  business_impact_hint = EXCLUDED.business_impact_hint,
  is_holiday = EXCLUDED.is_holiday,
  status = EXCLUDED.status,
  source_name = EXCLUDED.source_name,
  source_url = EXCLUDED.source_url,
  metadata = EXCLUDED.metadata,
  updated_at = CURRENT_TIMESTAMP;

-- Verificação: devem existir os dois registros com janela 08:00-17:00 -03.
-- SELECT slug, local_date, starts_at, ends_at, is_holiday
-- FROM impact_events
-- WHERE slug IN (
--   'eleicoes-gerais-2026-primeiro-turno',
--   'eleicoes-gerais-2026-segundo-turno'
-- )
-- ORDER BY local_date;
