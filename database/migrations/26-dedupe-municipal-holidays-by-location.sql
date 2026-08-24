-- Migration: remove duplicate municipal holiday rows for the same location
--
-- After splitting collapsed municipal holidays, old cross-linked rows can become
-- repeated one-location holidays with identical name/date/year/type/description.

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
