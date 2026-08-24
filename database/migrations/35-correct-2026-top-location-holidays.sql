-- Correct 2026 holiday data for locations highlighted by the weekly
-- admin location usage report.

CREATE TEMP TABLE top_location_holiday_additions (
  location_code varchar(20) NOT NULL,
  holiday_date date NOT NULL,
  holiday_name varchar(255) NOT NULL,
  holiday_type varchar(30) NOT NULL CHECK (holiday_type IN ('municipal')),
  is_fixed boolean NOT NULL,
  description text NOT NULL
) ON COMMIT DROP;

INSERT INTO top_location_holiday_additions (
  location_code,
  holiday_date,
  holiday_name,
  holiday_type,
  is_fixed,
  description
) VALUES
  ('SP-agudos', DATE '2026-01-25', 'Dia do Padroeiro São Paulo Apóstolo', 'municipal', true, 'Feriado municipal de Agudos - Lei nº 5.048/2017'),
  ('SP-agudos', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Agudos - Lei nº 616/1967'),
  ('SP-americana', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado municipal de Americana'),
  ('SP-americana', DATE '2026-08-27', 'Aniversário de Americana', 'municipal', true, 'Feriado municipal de Americana');

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT DISTINCT
  a.holiday_name,
  a.holiday_date,
  2026,
  a.holiday_type,
  a.description,
  a.is_fixed
FROM top_location_holiday_additions a
WHERE NOT EXISTS (
  SELECT 1
  FROM holidays h
  WHERE h.name = a.holiday_name
    AND h.date = a.holiday_date
    AND h.year = 2026
    AND h.type = a.holiday_type
    AND COALESCE(h.description, '') = a.description
);

INSERT INTO holiday_locations (holiday_id, location_id)
SELECT DISTINCT h.id, l.id
FROM top_location_holiday_additions a
JOIN holidays h
  ON h.name = a.holiday_name
 AND h.date = a.holiday_date
 AND h.year = 2026
 AND h.type = a.holiday_type
 AND COALESCE(h.description, '') = a.description
JOIN locations l ON l.code = a.location_code
ON CONFLICT (holiday_id, location_id) DO NOTHING;

UPDATE holidays h
SET
  date = DATE '2026-07-27',
  name = 'Aniversário de Agudos',
  description = 'Feriado municipal de Agudos - Lei nº 616/1967',
  updated_at = CURRENT_TIMESTAMP
FROM holiday_locations hl
JOIN locations l ON l.id = hl.location_id
WHERE h.id = hl.holiday_id
  AND l.code = 'SP-agudos'
  AND h.year = 2026
  AND h.type = 'municipal'
  AND h.date = DATE '2026-07-01'
  AND h.name = 'Aniversário de Agudos';

CREATE TEMP TABLE top_location_holiday_removals (
  location_code varchar(20) NOT NULL,
  holiday_date date NOT NULL,
  holiday_type varchar(30) NOT NULL CHECK (holiday_type IN ('state')),
  holiday_name varchar(255) NOT NULL,
  reason text NOT NULL
) ON COMMIT DROP;

INSERT INTO top_location_holiday_removals (
  location_code,
  holiday_date,
  holiday_type,
  holiday_name,
  reason
) VALUES
  ('RO', DATE '2026-06-18', 'state', 'Dia do Evangélico', 'Em 2026 o calendário oficial de RO lista a data apenas como feriado municipal em Corumbiara, Theobroma e Castanheiras'),
  ('MG', DATE '2026-04-21', 'state', 'Tiradentes', 'O calendário estadual de MG para 2026 consolida Tiradentes como feriado nacional, evitando duplicidade com o registro nacional');

DELETE FROM holiday_locations hl
USING top_location_holiday_removals r, holidays h, locations l
WHERE h.id = hl.holiday_id
  AND l.id = hl.location_id
  AND l.code = r.location_code
  AND h.date = r.holiday_date
  AND h.year = 2026
  AND h.type = r.holiday_type
  AND h.name = r.holiday_name;

DELETE FROM holidays h
WHERE h.year = 2026
  AND NOT EXISTS (SELECT 1 FROM holiday_locations hl WHERE hl.holiday_id = h.id);
