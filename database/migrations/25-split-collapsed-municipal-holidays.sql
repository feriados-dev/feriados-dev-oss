-- Migration: split municipal holidays that were collapsed across municipalities
--
-- Migrations 20 and 21 originally deduplicated municipal seeds by
-- name/date/year/type only. Generic dates such as "Feriado Municipal" on the
-- same day could therefore share one holiday row across several municipalities.
-- The public API then exposed those unrelated municipality links in `locations`.

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
SELECT
  new_holiday_id,
  name,
  date,
  year,
  type,
  description,
  is_fixed
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
