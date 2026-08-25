-- Migration 22: Impact events for 2027
-- Mirrors the 2026 impact events catalogue, excluding Copa Masculina 2026 (one-off),
-- Rock in Rio (biennial, next 2028), Bienal do Livro (biennial, next 2028),
-- and Eleições (specific to 2026 cycle).
-- Copa do Mundo Feminina 2027 already seeded in prior migration.
-- Easter 2027 = March 28 → Ash Wednesday = Feb 10 → Carnaval Friday = Feb 5.

INSERT INTO impact_events (
  id, slug, name,
  starts_at, ends_at, local_date, year,
  category, impact_level, impact_scope, impact_type,
  country_code, location_code, timezone,
  description, business_impact_hint,
  is_holiday, status, source_name, source_url, metadata
) VALUES

-- Carnaval 2027 (Feb 5–10)
(
  uuid_generate_v4(), 'carnaval-2027-operacao-brasil', 'Carnaval 2027 - impacto operacional',
  '2027-02-05T21:00:00.000Z', '2027-02-10T17:00:00.000Z', '2027-02-05T00:00:00.000Z', 2027,
  'cultural', 'high', 'national', 'work_schedule_disruption',
  'BR', NULL, 'America/Sao_Paulo',
  'Janela operacional do Carnaval 2027, incluindo sexta anterior, fim de semana, segunda, terça e Quarta-feira de Cinzas.',
  'Pode reduzir expediente, alterar atendimento, afetar logística e deslocamentos em várias regiões.',
  false, 'scheduled', 'Definição operacional Feriados.dev API', NULL,
  '{"season": "carnival", "holidayOverlap": true}'
),

-- Lollapalooza 2027 (Mar 19–21, SP — data estimada, 3.º fim de semana de março)
(
  uuid_generate_v4(), 'lollapalooza-brasil-2027', 'Lollapalooza Brasil 2027',
  '2027-03-19T15:00:00.000Z', '2027-03-22T02:59:00.000Z', '2027-03-19T00:00:00.000Z', 2027,
  'cultural', 'high', 'municipality', 'traffic_disruption',
  'BR', 'SP-SAO-PAULO', 'America/Sao_Paulo',
  'Festival de grande porte em São Paulo.',
  'Pode afetar mobilidade, hotelaria, alimentação, atendimento local e demanda de transporte.',
  false, 'tentative', 'Lollapalooza Brasil', 'https://www.lollapaloozabr.com/',
  '{"city": "São Paulo", "state": "SP"}'
),

-- São João 2027 — Campina Grande
(
  uuid_generate_v4(), 'sao-joao-campina-grande-2027', 'São João 2027 - Campina Grande',
  '2027-06-01T03:00:00.000Z', '2027-07-01T02:59:00.000Z', '2027-05-31T23:00:00.000Z', 2027,
  'cultural', 'high', 'municipality', 'tourism_and_service_demand_spike',
  'BR', 'PB-CAMPINA-GRANDE', 'America/Sao_Paulo',
  'Janela operacional do São João em Campina Grande.',
  'Pode elevar turismo, ocupação hoteleira, mobilidade urbana, alimentação e atendimento local.',
  false, 'tentative', 'Definição operacional Feriados.dev API', NULL,
  '{"city": "Campina Grande", "state": "PB", "season": "sao_joao"}'
),

-- São João 2027 — Caruaru
(
  uuid_generate_v4(), 'sao-joao-caruaru-2027', 'São João 2027 - Caruaru',
  '2027-06-01T03:00:00.000Z', '2027-07-01T02:59:00.000Z', '2027-05-31T23:00:00.000Z', 2027,
  'cultural', 'high', 'municipality', 'tourism_and_service_demand_spike',
  'BR', 'PE-CARUARU', 'America/Sao_Paulo',
  'Janela operacional do São João em Caruaru.',
  'Pode elevar turismo, ocupação hoteleira, mobilidade urbana, alimentação e atendimento local.',
  false, 'tentative', 'Definição operacional Feriados.dev API', NULL,
  '{"city": "Caruaru", "state": "PE", "season": "sao_joao"}'
),

-- São João 2027 — Salvador
(
  uuid_generate_v4(), 'sao-joao-salvador-2027', 'São João 2027 - Salvador',
  '2027-06-01T03:00:00.000Z', '2027-07-01T02:59:00.000Z', '2027-05-31T23:00:00.000Z', 2027,
  'cultural', 'medium', 'municipality', 'tourism_and_service_demand_spike',
  'BR', 'BA-SALVADOR', 'America/Sao_Paulo',
  'Janela operacional de festas juninas em Salvador.',
  'Pode afetar turismo, eventos, transporte, alimentação e atendimento local.',
  false, 'tentative', 'Definição operacional Feriados.dev API', NULL,
  '{"city": "Salvador", "state": "BA", "season": "sao_joao"}'
),

-- Festival Folclórico de Parintins 2027 (Jun 25–27 — 60.ª edição)
(
  uuid_generate_v4(), 'festival-parintins-2027', 'Festival Folclórico de Parintins 2027',
  '2027-06-25T22:00:00.000Z', '2027-06-28T03:59:00.000Z', '2027-06-24T23:00:00.000Z', 2027,
  'cultural', 'high', 'municipality', 'tourism_and_service_demand_spike',
  'BR', 'AM-PARINTINS', 'America/Manaus',
  '60.º Festival Folclórico de Parintins, com três noites de apresentações dos bois Caprichoso e Garantido.',
  'Pode elevar turismo, ocupação hoteleira, transporte fluvial/aéreo, alimentação, atendimento local e demanda por serviços públicos.',
  false, 'scheduled', 'Definição operacional Feriados.dev API', NULL,
  '{"city": "Parintins", "state": "AM", "edition": 60, "participants": ["Caprichoso", "Garantido"]}'
),

-- Festa do Peão de Barretos 2027 (~Aug 19–30)
(
  uuid_generate_v4(), 'festa-do-peao-barretos-2027', 'Festa do Peão de Barretos 2027',
  '2027-08-19T03:00:00.000Z', '2027-08-30T02:59:00.000Z', '2027-08-18T23:00:00.000Z', 2027,
  'cultural', 'high', 'municipality', 'tourism_and_service_demand_spike',
  'BR', 'SP-BARRETOS', 'America/Sao_Paulo',
  'Evento de grande porte em Barretos.',
  'Pode afetar turismo, hotelaria, transporte, alimentação e operações locais.',
  false, 'tentative', 'Festa do Peão de Barretos', 'https://www.independentes.com.br/',
  '{"city": "Barretos", "state": "SP"}'
),

-- Círio de Nazaré 2027 — Belém (2.º domingo de outubro = Oct 10)
(
  uuid_generate_v4(), 'cirio-de-nazare-belem-2027-impacto', 'Círio de Nazaré 2027 - impacto operacional',
  '2027-10-10T03:00:00.000Z', '2027-10-13T02:59:00.000Z', '2027-10-09T23:00:00.000Z', 2027,
  'cultural', 'critical', 'municipality', 'public_mobility_disruption',
  'BR', 'PA-BELEM', 'America/Sao_Paulo',
  'Janela operacional do Círio de Nazaré em Belém.',
  'Pode afetar mobilidade, turismo, comércio, atendimento presencial, logística e serviços públicos.',
  false, 'scheduled', 'Definição operacional Feriados.dev API', NULL,
  '{"city": "Belém", "state": "PA", "holidayOverlap": true}'
),

-- Oktoberfest Blumenau 2027 (~Oct 6–24)
(
  uuid_generate_v4(), 'oktoberfest-blumenau-2027', 'Oktoberfest Blumenau 2027',
  '2027-10-06T03:00:00.000Z', '2027-10-24T02:59:00.000Z', '2027-10-05T23:00:00.000Z', 2027,
  'cultural', 'high', 'municipality', 'tourism_and_service_demand_spike',
  'BR', 'SC-BLUMENAU', 'America/Sao_Paulo',
  'Evento de grande porte em Blumenau.',
  'Pode afetar turismo, hotelaria, alimentação, mobilidade e atendimento local.',
  false, 'tentative', 'Oktoberfest Blumenau', 'https://oktoberfestblumenau.com.br/',
  '{"city": "Blumenau", "state": "SC"}'
),

-- Grande Prêmio de São Paulo F1 2027 (~Nov 5–8, calendário a confirmar)
(
  uuid_generate_v4(), 'gp-sao-paulo-f1-2027', 'Grande Prêmio de São Paulo F1 2027',
  '2027-11-05T03:00:00.000Z', '2027-11-08T02:59:00.000Z', '2027-11-05T00:00:00.000Z', 2027,
  'sports', 'high', 'municipality', 'traffic_disruption',
  'BR', 'SP-SAO-PAULO', 'America/Sao_Paulo',
  'Fim de semana do Grande Prêmio de São Paulo de Fórmula 1.',
  'Pode afetar mobilidade, hotelaria, alimentação, transporte, atendimento local e demanda turística.',
  false, 'tentative', 'Formula 1', 'https://www.formula1.com/',
  '{"city": "São Paulo", "state": "SP", "competition": "Formula 1"}'
),

-- Black Friday 2027 (último sexta de novembro = Nov 26)
(
  uuid_generate_v4(), 'black-friday-2027-impacto-operacional', 'Black Friday 2027 - impacto operacional',
  '2027-11-26T03:00:00.000Z', '2027-11-27T02:59:00.000Z', '2027-11-26T00:00:00.000Z', 2027,
  'commerce', 'high', 'national', 'commerce_peak',
  'BR', NULL, 'America/Sao_Paulo',
  'Pico promocional nacional de varejo e e-commerce.',
  'Pode elevar tráfego, transações, atendimento, logística, antifraude e incidentes operacionais.',
  false, 'scheduled', 'Definição operacional Feriados.dev API', NULL,
  '{"commerceEvent": "black_friday", "alsoInMarketingDates": true}'
),

-- Cyber Monday 2027 (Nov 29)
(
  uuid_generate_v4(), 'cyber-monday-2027-impacto-operacional', 'Cyber Monday 2027 - impacto operacional',
  '2027-11-29T03:00:00.000Z', '2027-11-30T02:59:00.000Z', '2027-11-29T00:00:00.000Z', 2027,
  'commerce', 'medium', 'national', 'commerce_peak',
  'BR', NULL, 'America/Sao_Paulo',
  'Data promocional online após a Black Friday.',
  'Pode elevar tráfego, transações, atendimento, logística, antifraude e incidentes operacionais.',
  false, 'scheduled', 'Definição operacional Feriados.dev API', NULL,
  '{"commerceEvent": "cyber_monday", "alsoInMarketingDates": true}'
),

-- CCXP 2027 (~Dec 2–5, São Paulo Expo — data estimada)
(
  uuid_generate_v4(), 'ccxp-2027', 'CCXP 2027',
  '2027-12-02T13:00:00.000Z', '2027-12-06T01:00:00.000Z', '2027-12-02T00:00:00.000Z', 2027,
  'cultural', 'high', 'municipality', 'tourism_and_service_demand_spike',
  'BR', 'SP-SAO-PAULO', 'America/Sao_Paulo',
  'CCXP27 no São Paulo Expo, evento de grande porte de cultura pop, cinema, séries, games, quadrinhos e entretenimento.',
  'Pode afetar mobilidade, hotelaria, alimentação, atendimento local, ativações de marca, varejo geek e demanda digital.',
  false, 'tentative', 'CCXP', 'https://ccxp.com.br/',
  '{"city": "São Paulo", "state": "SP", "venue": "São Paulo Expo"}'
)

ON CONFLICT (slug, country_code) DO NOTHING;
