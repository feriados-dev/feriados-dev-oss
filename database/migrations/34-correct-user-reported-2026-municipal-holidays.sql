-- Correct 2026 municipal holidays reported through support testing.

CREATE TEMP TABLE user_reported_municipal_holiday_additions (
  location_code varchar(64) NOT NULL,
  holiday_date date NOT NULL,
  holiday_name varchar(255) NOT NULL,
  holiday_type varchar(30) NOT NULL CHECK (holiday_type IN ('municipal')),
  is_fixed boolean NOT NULL,
  description text NOT NULL
) ON COMMIT DROP;

INSERT INTO user_reported_municipal_holiday_additions (
  location_code,
  holiday_date,
  holiday_name,
  holiday_type,
  is_fixed,
  description
) VALUES
  ('RS-piratini', DATE '2026-07-06', 'Aniversário de Piratini', 'municipal', true, 'Feriado municipal de Piratini - aniversário do município'),
  ('MG-sao-tomas-de-aquino', DATE '2026-07-08', 'Aniversário de São Tomás de Aquino', 'municipal', true, 'Feriado municipal de São Tomás de Aquino - aniversário do município'),
  ('SP-uchoa', DATE '2026-03-28', 'Aniversário de Uchoa', 'municipal', true, 'Feriado municipal de Uchoa - Lei nº 3.909/2019'),
  ('SP-uchoa', DATE '2026-06-04', 'Corpus Christi', 'municipal', false, 'Feriado religioso municipal de Uchoa - Lei nº 3.909/2019'),
  ('SP-uchoa', DATE '2026-07-04', 'Santa Isabel, Padroeira do Município', 'municipal', true, 'Feriado religioso municipal de Uchoa - Lei nº 3.909/2019'),
  ('SP-uchoa', DATE '2026-09-29', 'São Miguel', 'municipal', true, 'Feriado religioso municipal de Uchoa - Lei nº 3.909/2019');

DELETE FROM holiday_locations hl
USING holidays h, locations l
WHERE h.id = hl.holiday_id
  AND l.id = hl.location_id
  AND l.code = 'SP-uchoa'
  AND h.year = 2026
  AND h.type = 'municipal'
  AND h.date = DATE '2026-07-01'
  AND h.name = 'Aniversário de Uchoa';

DELETE FROM holidays h
WHERE h.year = 2026
  AND h.type = 'municipal'
  AND h.date = DATE '2026-07-01'
  AND h.name = 'Aniversário de Uchoa'
  AND NOT EXISTS (SELECT 1 FROM holiday_locations hl WHERE hl.holiday_id = h.id);

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT DISTINCT
  a.holiday_name,
  a.holiday_date,
  2026,
  a.holiday_type,
  a.description,
  a.is_fixed
FROM user_reported_municipal_holiday_additions a
WHERE NOT EXISTS (
  SELECT 1
  FROM holidays h
  JOIN holiday_locations hl ON hl.holiday_id = h.id
  JOIN locations l ON l.id = hl.location_id
  WHERE l.code = a.location_code
    AND h.date = a.holiday_date
    AND h.year = 2026
    AND h.type = a.holiday_type
    AND h.name = a.holiday_name
);

INSERT INTO holiday_locations (holiday_id, location_id)
SELECT DISTINCT h.id, l.id
FROM user_reported_municipal_holiday_additions a
JOIN holidays h
  ON h.name = a.holiday_name
 AND h.date = a.holiday_date
 AND h.year = 2026
 AND h.type = a.holiday_type
 AND COALESCE(h.description, '') = a.description
JOIN locations l ON l.code = a.location_code
WHERE NOT EXISTS (
  SELECT 1
  FROM holiday_locations existing
  WHERE existing.holiday_id = h.id
    AND existing.location_id = l.id
)
ON CONFLICT (holiday_id, location_id) DO NOTHING;

DELETE FROM holidays h
WHERE h.year = 2026
  AND NOT EXISTS (SELECT 1 FROM holiday_locations hl WHERE hl.holiday_id = h.id);
