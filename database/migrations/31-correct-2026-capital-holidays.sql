-- Update validated 2026 holidays for Brazilian capitals using official
-- government calendars and legislation.

CREATE TEMP TABLE capital_holiday_additions (
  location_code varchar(20) NOT NULL,
  holiday_date date NOT NULL,
  holiday_name varchar(255) NOT NULL,
  holiday_type varchar(30) NOT NULL CHECK (holiday_type IN ('state', 'municipal')),
  is_fixed boolean NOT NULL,
  description text NOT NULL
) ON COMMIT DROP;

INSERT INTO capital_holiday_additions (location_code, holiday_date, holiday_name, holiday_type, is_fixed, description) VALUES
  ('AC', DATE '2026-01-22', 'Dia do Católico', 'state', false, 'Feriado estadual do Acre transferido em 2026'),
  ('AC', DATE '2026-03-08', 'Dia Internacional da Mulher', 'state', true, 'Feriado estadual do Acre'),

  ('AL-maceio', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Maceió'),
  ('AL-maceio', DATE '2026-08-27', 'Nossa Senhora dos Prazeres', 'municipal', true, 'Feriado municipal de Maceió'),
  ('AL-maceio', DATE '2026-12-08', 'Nossa Senhora da Conceição', 'municipal', true, 'Feriado municipal de Maceió'),

  ('TO-palmas', DATE '2026-03-19', 'Dia de São José', 'municipal', true, 'Padroeiro de Palmas'),
  ('TO', DATE '2026-08-15', 'Dia do Senhor do Bonfim', 'state', true, 'Feriado estadual do Tocantins'),

  ('SE-aracaju', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Aracaju'),
  ('SE-aracaju', DATE '2026-06-24', 'São João', 'municipal', true, 'Feriado municipal de Aracaju'),
  ('SE-aracaju', DATE '2026-12-08', 'Nossa Senhora da Conceição', 'municipal', true, 'Feriado municipal de Aracaju'),

  ('RR-boa-vista', DATE '2026-01-20', 'Dia de São Sebastião', 'municipal', true, 'Feriado municipal de Boa Vista'),
  ('RR-boa-vista', DATE '2026-06-29', 'São Pedro', 'municipal', true, 'Feriado municipal de Boa Vista'),
  ('RR-boa-vista', DATE '2026-07-09', 'Aniversário de Boa Vista', 'municipal', true, 'Feriado municipal de Boa Vista'),

  ('CE-fortaleza', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Fortaleza'),

  ('AP', DATE '2026-05-15', 'Dia de Cabralzinho', 'state', true, 'Feriado estadual do Amapá'),
  ('AP', DATE '2026-09-13', 'Aniversário da criação do ex-território federal do Amapá', 'state', true, 'Feriado estadual do Amapá'),
  ('AP', DATE '2026-11-30', 'Dia do Evangélico', 'state', true, 'Feriado estadual do Amapá'),

  ('RO-porto-velho', DATE '2026-01-24', 'Instalação do Município / Dia de São Francisco de Sales', 'municipal', true, 'Feriado municipal de Porto Velho'),
  ('RO-porto-velho', DATE '2026-05-24', 'Dia de Nossa Senhora Auxiliadora', 'municipal', true, 'Padroeira de Porto Velho'),
  ('RO-porto-velho', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Porto Velho'),

  ('MA-sao-luis', DATE '2026-06-29', 'São Pedro', 'municipal', true, 'Feriado municipal de São Luís'),
  ('MA-sao-luis', DATE '2026-12-08', 'Nossa Senhora da Conceição', 'municipal', true, 'Feriado municipal de São Luís'),

  ('PA-belem', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Belém'),
  ('PA-belem', DATE '2026-12-08', 'Nossa Senhora da Conceição', 'municipal', true, 'Feriado municipal de Belém'),

  ('MS-campo-grande', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Campo Grande'),
  ('MS-campo-grande', DATE '2026-06-13', 'Dia de Santo Antônio', 'municipal', true, 'Feriado municipal de Campo Grande'),

  ('SC', DATE '2026-08-16', 'Dia do Estado de Santa Catarina (Data Magna)', 'state', false, 'Feriado estadual de Santa Catarina transferido para o domingo seguinte em 2026'),
  ('SC-florianopolis', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Florianópolis'),
  ('SC-florianopolis', DATE '2026-11-25', 'Dia de Santa Catarina de Alexandria', 'municipal', true, 'Feriado municipal de Florianópolis'),

  ('GO-goiania', DATE '2026-05-24', 'Dia de Nossa Senhora Auxiliadora', 'municipal', true, 'Padroeira de Goiânia'),
  ('GO-goiania', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Goiânia'),
  ('GO', DATE '2026-07-26', 'Fundação da Cidade de Goiás', 'state', true, 'Feriado estadual de Goiás'),

  ('RN-natal', DATE '2026-01-06', 'Dia de Santos Reis', 'municipal', true, 'Feriado municipal de Natal'),
  ('RN-natal', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Natal'),

  ('PE-recife', DATE '2026-12-08', 'Nossa Senhora da Conceição', 'municipal', true, 'Feriado municipal do Recife'),

  ('RJ', DATE '2026-06-04', 'Corpus Christi', 'state', false, 'Feriado estadual do Rio de Janeiro em 2026'),

  ('BA-salvador', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Salvador'),
  ('BA-salvador', DATE '2026-06-24', 'São João', 'municipal', true, 'Feriado municipal de Salvador'),

  ('PI-teresina', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Teresina'),
  ('PI', DATE '2026-10-19', 'Dia do Piauí', 'state', true, 'Feriado estadual do Piauí'),

  ('MG-belo-horizonte', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Belo Horizonte'),
  ('MG-belo-horizonte', DATE '2026-08-15', 'Assunção de Nossa Senhora', 'municipal', true, 'Feriado municipal de Belo Horizonte'),
  ('MG-belo-horizonte', DATE '2026-12-08', 'Imaculada Conceição', 'municipal', true, 'Feriado municipal de Belo Horizonte'),

  ('MT-cuiaba', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Cuiabá'),

  ('PB-joao-pessoa', DATE '2026-06-24', 'São João', 'municipal', true, 'Feriado municipal de João Pessoa'),
  ('PB-joao-pessoa', DATE '2026-12-08', 'Imaculada Conceição', 'municipal', true, 'Feriado municipal de João Pessoa'),

  ('RS-porto-alegre', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Porto Alegre'),

  ('ES-vitoria', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Vitória'),

  ('DF', DATE '2026-06-04', 'Corpus Christi', 'state', false, 'Feriado local do Distrito Federal'),

  ('PR-curitiba', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Curitiba');

WITH inserted AS (
  INSERT INTO holidays (name, date, year, type, description, is_fixed)
  SELECT DISTINCT holiday_name, holiday_date, 2026, holiday_type, description, is_fixed
  FROM capital_holiday_additions a
  WHERE NOT EXISTS (
    SELECT 1 FROM holidays h
    WHERE h.name = a.holiday_name
      AND h.date = a.holiday_date
      AND h.year = 2026
      AND h.type = a.holiday_type
  )
  RETURNING id, name, date, type
), target_holidays AS (
  SELECT h.id, h.name, h.date, h.type
  FROM holidays h
  JOIN capital_holiday_additions a
    ON a.holiday_name = h.name
   AND a.holiday_date = h.date
   AND a.holiday_type = h.type
  WHERE h.year = 2026
), target_links AS (
  SELECT DISTINCT th.id AS holiday_id, l.id AS location_id
  FROM capital_holiday_additions a
  JOIN target_holidays th
    ON th.name = a.holiday_name
   AND th.date = a.holiday_date
   AND th.type = a.holiday_type
  JOIN locations l ON l.code = a.location_code
)
INSERT INTO holiday_locations (holiday_id, location_id)
SELECT holiday_id, location_id FROM target_links
ON CONFLICT (holiday_id, location_id) DO NOTHING;

CREATE TEMP TABLE capital_holiday_removals (
  location_code varchar(20) NOT NULL,
  holiday_date date NOT NULL,
  holiday_type varchar(30) NOT NULL CHECK (holiday_type IN ('state', 'municipal')),
  reason text NOT NULL
) ON COMMIT DROP;

INSERT INTO capital_holiday_removals (location_code, holiday_date, holiday_type, reason) VALUES
  ('AC', DATE '2026-01-20', 'state', 'Dia do Católico foi transferido para 2026-01-22 no Acre'),
  ('AL-maceio', DATE '2026-12-05', 'municipal', 'Aniversário de Maceió foi decretado como ponto facultativo, não feriado municipal'),
  ('TO', DATE '2026-03-18', 'state', 'Dia da Autonomia não é feriado estadual do Tocantins'),
  ('SC', DATE '2026-08-11', 'state', 'Data Magna de Santa Catarina é transferida para o domingo seguinte em 2026'),
  ('PE-recife', DATE '2026-03-12', 'municipal', 'Aniversário do Recife não consta como feriado municipal vigente'),
  ('RJ', DATE '2026-02-16', 'state', 'Carnaval de segunda-feira é ponto facultativo no RJ em 2026'),
  ('RJ-rio-de-janeiro', DATE '2026-03-01', 'municipal', 'Aniversário da cidade do Rio de Janeiro não é feriado municipal'),
  ('RJ', DATE '2026-10-20', 'state', 'Dia do Comerciário em 2026 não ocorre em 20 de outubro e é setorial'),
  ('BA-salvador', DATE '2026-03-29', 'municipal', 'Aniversário de Salvador não é feriado municipal'),
  ('PI', DATE '2026-03-13', 'state', 'Batalha do Jenipapo não é feriado estadual do Piauí'),
  ('RS-porto-alegre', DATE '2026-03-26', 'municipal', 'Aniversário de Porto Alegre não é feriado municipal'),
  ('PR', DATE '2026-12-19', 'state', 'Emancipação política do Paraná não se constitui feriado civil');

DELETE FROM holiday_locations hl
USING capital_holiday_removals r, holidays h, locations l
WHERE h.id = hl.holiday_id
  AND l.id = hl.location_id
  AND l.code = r.location_code
  AND h.date = r.holiday_date
  AND h.year = 2026
  AND h.type = r.holiday_type;

DELETE FROM holidays h
WHERE h.year = 2026
  AND NOT EXISTS (SELECT 1 FROM holiday_locations hl WHERE hl.holiday_id = h.id);
