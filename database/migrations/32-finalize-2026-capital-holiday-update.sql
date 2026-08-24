-- Finalize the 2026 capital holiday data update.
--
-- Migration 31 added the intended data set, then reused municipal holidays by
-- name/date/type. This follow-up makes the operation location-specific and
-- splits any municipal holiday rows that became shared across municipalities.

CREATE TEMP TABLE capital_holiday_update (
  location_code varchar(20) NOT NULL,
  holiday_date date NOT NULL,
  holiday_name varchar(255) NOT NULL,
  holiday_type varchar(30) NOT NULL CHECK (holiday_type IN ('state', 'municipal')),
  is_fixed boolean NOT NULL,
  description text NOT NULL
) ON COMMIT DROP;

INSERT INTO capital_holiday_update (location_code, holiday_date, holiday_name, holiday_type, is_fixed, description) VALUES
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

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT DISTINCT u.holiday_name, u.holiday_date, 2026, u.holiday_type, u.description, u.is_fixed
FROM capital_holiday_update u
WHERE NOT EXISTS (
  SELECT 1
  FROM holidays h
  WHERE h.name = u.holiday_name
    AND h.date = u.holiday_date
    AND h.year = 2026
    AND h.type = u.holiday_type
    AND COALESCE(h.description, '') = u.description
);

INSERT INTO holiday_locations (holiday_id, location_id)
SELECT DISTINCT h.id, l.id
FROM capital_holiday_update u
JOIN holidays h
  ON h.name = u.holiday_name
 AND h.date = u.holiday_date
 AND h.year = 2026
 AND h.type = u.holiday_type
 AND COALESCE(h.description, '') = u.description
JOIN locations l ON l.code = u.location_code
ON CONFLICT (holiday_id, location_id) DO NOTHING;

CREATE TEMP TABLE municipal_holiday_split_targets ON COMMIT DROP AS
WITH affected_holidays AS (
  SELECT h.id
  FROM holidays h
  JOIN holiday_locations hl ON hl.holiday_id = h.id
  JOIN locations l ON l.id = hl.location_id
  WHERE h.type = 'municipal'
    AND l.type = 'municipality'
  GROUP BY h.id
  HAVING COUNT(DISTINCT l.id) > 1
),
affected_links AS (
  SELECT
    uuid_generate_v4() AS new_holiday_id,
    h.id AS original_holiday_id,
    l.id AS location_id,
    l.name AS location_name,
    h.name,
    h.date,
    h.year,
    h.type,
    h.description,
    h.is_fixed
  FROM affected_holidays affected
  JOIN holidays h ON h.id = affected.id
  JOIN holiday_locations hl ON hl.holiday_id = h.id
  JOIN locations l ON l.id = hl.location_id
  WHERE l.type = 'municipality'
)
SELECT
  new_holiday_id,
  original_holiday_id,
  location_id,
  name,
  date,
  year,
  type,
  CASE
    WHEN description ILIKE 'Feriado municipal de %'
      THEN 'Feriado municipal de ' || location_name
    WHEN description ILIKE 'Fundação de %'
      THEN 'Fundação de ' || location_name
    ELSE description
  END AS description,
  is_fixed
FROM affected_links;

INSERT INTO holidays (id, name, date, year, type, description, is_fixed)
SELECT new_holiday_id, name, date, year, type, description, is_fixed
FROM municipal_holiday_split_targets;

INSERT INTO holiday_locations (holiday_id, location_id)
SELECT new_holiday_id, location_id
FROM municipal_holiday_split_targets
ON CONFLICT (holiday_id, location_id) DO NOTHING;

DELETE FROM holiday_locations
WHERE holiday_id IN (
  SELECT DISTINCT original_holiday_id
  FROM municipal_holiday_split_targets
);

DELETE FROM holidays
WHERE id IN (
  SELECT DISTINCT original_holiday_id
  FROM municipal_holiday_split_targets
);

WITH duplicate_municipal_holidays AS (
  SELECT
    h.id AS holiday_id,
    ROW_NUMBER() OVER (
      PARTITION BY
        h.name,
        h.date,
        h.year,
        h.type,
        COALESCE(h.description, ''),
        h.is_fixed,
        hl.location_id
      ORDER BY h.created_at ASC, h.id ASC
    ) AS duplicate_rank
  FROM holidays h
  JOIN holiday_locations hl ON hl.holiday_id = h.id
  JOIN locations l ON l.id = hl.location_id
  WHERE h.type = 'municipal'
    AND l.type = 'municipality'
),
holidays_to_delete AS (
  SELECT holiday_id
  FROM duplicate_municipal_holidays
  WHERE duplicate_rank > 1
)
DELETE FROM holidays h
USING holidays_to_delete d
WHERE h.id = d.holiday_id;

DELETE FROM holidays h
WHERE h.year = 2026
  AND NOT EXISTS (SELECT 1 FROM holiday_locations hl WHERE hl.holiday_id = h.id);
