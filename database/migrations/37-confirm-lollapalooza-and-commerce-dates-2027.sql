-- Confirma o Lollapalooza Brasil 2027 e inclui duas datas comerciais
-- recorrentes de grande relevância no calendário brasileiro.
-- Estas datas são eventos de impacto, não feriados oficiais.

INSERT INTO impact_events (
  slug, name, starts_at, ends_at, local_date, year,
  category, impact_level, impact_scope, impact_type,
  country_code, location_code, timezone,
  description, business_impact_hint,
  is_holiday, status, source_name, source_url, metadata
) VALUES
(
  'dia-das-maes-2027-impacto-operacional',
  'Dia das Mães 2027 - impacto comercial',
  '2027-05-09 00:00:00-03', '2027-05-09 23:59:59-03', '2027-05-09', 2027,
  'commerce', 'high', 'national', 'commerce_peak',
  'BR', NULL, 'America/Sao_Paulo',
  'Data comercial nacional celebrada no segundo domingo de maio.',
  'Pode elevar vendas, campanhas, entregas, atendimento e tráfego de comércio eletrônico nos dias que antecedem a data.',
  false, 'scheduled', 'Sebrae', 'https://sebraeatende.com.br/system/files/datas_comemorativas_tematicas.pdf',
  '{"commerceEvent":"mothers_day","dateRule":"second_sunday_of_may"}'::jsonb
),
(
  'dia-dos-pais-2027-impacto-operacional',
  'Dia dos Pais 2027 - impacto comercial',
  '2027-08-08 00:00:00-03', '2027-08-08 23:59:59-03', '2027-08-08', 2027,
  'commerce', 'high', 'national', 'commerce_peak',
  'BR', NULL, 'America/Sao_Paulo',
  'Data comercial nacional celebrada no segundo domingo de agosto.',
  'Pode elevar vendas, campanhas, entregas, atendimento e tráfego de comércio eletrônico nos dias que antecedem a data.',
  false, 'scheduled', 'Sebrae', 'https://sebraeatende.com.br/system/files/datas_comemorativas_tematicas.pdf',
  '{"commerceEvent":"fathers_day","dateRule":"second_sunday_of_august"}'::jsonb
),
(
  'lollapalooza-brasil-2027',
  'Lollapalooza Brasil 2027',
  '2027-03-19 15:00:00-03', '2027-03-21 23:59:59-03', '2027-03-19', 2027,
  'cultural', 'high', 'municipality', 'traffic_disruption',
  'BR', 'SP-SAO-PAULO', 'America/Sao_Paulo',
  'Festival de grande porte no Autódromo de Interlagos, em São Paulo, confirmado para 19 a 21 de março de 2027.',
  'Pode afetar mobilidade, hotelaria, alimentação, atendimento local e demanda de transporte.',
  false, 'scheduled', 'Lollapalooza Brasil / Ticketmaster Brasil', 'https://www.ticketmaster.com.br/event/lolla-lovers-lollapaloozabr',
  '{"city":"São Paulo","state":"SP","venue":"Autódromo de Interlagos","dates":["2027-03-19","2027-03-20","2027-03-21"]}'::jsonb
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

-- Verificação: devem existir 3 eventos de 2027 nas datas informadas,
-- todos com is_holiday = false e status = scheduled.
SELECT slug, local_date, status, is_holiday
FROM impact_events
WHERE slug IN (
  'dia-das-maes-2027-impacto-operacional',
  'dia-dos-pais-2027-impacto-operacional',
  'lollapalooza-brasil-2027'
)
ORDER BY local_date;
