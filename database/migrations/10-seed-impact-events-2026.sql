-- Seed: eventos de alto impacto operacional no Brasil.
--
-- Estes eventos não são feriados oficiais. O campo is_holiday permanece false
-- para que clientes possam modelar impacto em expediente, atendimento e demanda
-- sem misturar estes dados ao calendário legal de feriados.
--
-- Fonte: páginas oficiais da FIFA para as partidas do Brasil na Copa do Mundo 2026.
-- - Brasil x Marrocos: 13/06/2026, 19:00 em Brasília
--   https://www.fifa.com/en/articles/brazil-morocco-preview-live-stream-team-news-tickets
-- - Brasil x Haiti: 19/06/2026, 21:30 em Brasília
--   https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/brazil-haiti-live-stream-team-news-tickets
-- - Escócia x Brasil: 24/06/2026, 19:00 em Brasília
--   https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/scotland-brazil-live-stream-team-news-tickets

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
)
VALUES
(
    'copa-2026-brasil-marrocos',
    'Copa 2026: Brasil x Marrocos',
    '2026-06-13 19:00:00-03',
    '2026-06-13 21:00:00-03',
    '2026-06-13',
    2026,
    'sports',
    'high',
    'national',
    'work_schedule_disruption',
    'BR',
    NULL,
    'America/Sao_Paulo',
    'Jogo da Seleção Brasileira na fase de grupos da Copa do Mundo FIFA 2026.',
    'Pode afetar expediente, atendimento, tráfego, campanhas e demanda de suporte no Brasil.',
    false,
    'scheduled',
    'FIFA',
    'https://www.fifa.com/en/articles/brazil-morocco-preview-live-stream-team-news-tickets',
    '{"competition":"FIFA World Cup 2026","phase":"group_stage","group":"C","teams":["Brazil","Morocco"],"venue":"New York New Jersey Stadium"}'::jsonb
),
(
    'copa-2026-brasil-haiti',
    'Copa 2026: Brasil x Haiti',
    '2026-06-19 21:30:00-03',
    '2026-06-19 23:30:00-03',
    '2026-06-19',
    2026,
    'sports',
    'high',
    'national',
    'work_schedule_disruption',
    'BR',
    NULL,
    'America/Sao_Paulo',
    'Jogo da Seleção Brasileira na fase de grupos da Copa do Mundo FIFA 2026.',
    'Pode afetar expediente noturno, operações de varejo, campanhas e demanda de suporte no Brasil.',
    false,
    'scheduled',
    'FIFA',
    'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/brazil-haiti-live-stream-team-news-tickets',
    '{"competition":"FIFA World Cup 2026","phase":"group_stage","group":"C","teams":["Brazil","Haiti"],"venue":"Philadelphia Stadium"}'::jsonb
),
(
    'copa-2026-escocia-brasil',
    'Copa 2026: Escócia x Brasil',
    '2026-06-24 19:00:00-03',
    '2026-06-24 21:00:00-03',
    '2026-06-24',
    2026,
    'sports',
    'high',
    'national',
    'work_schedule_disruption',
    'BR',
    NULL,
    'America/Sao_Paulo',
    'Jogo da Seleção Brasileira na fase de grupos da Copa do Mundo FIFA 2026.',
    'Pode afetar expediente, atendimento, tráfego, campanhas e demanda de suporte no Brasil.',
    false,
    'scheduled',
    'FIFA',
    'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/scotland-brazil-live-stream-team-news-tickets',
    '{"competition":"FIFA World Cup 2026","phase":"group_stage","group":"C","teams":["Scotland","Brazil"],"venue":"Miami Stadium"}'::jsonb
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
