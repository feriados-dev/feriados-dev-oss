-- Migration: Remove duplicate locations
-- This removes duplicate locations created from multiple migration runs

-- Create a temporary table with the IDs to keep (oldest created_at for each unique location)
-- Unique key is based on type and code
CREATE TEMP TABLE locations_to_keep AS
SELECT DISTINCT ON (type, code) id
FROM locations
ORDER BY type, code, created_at ASC;

-- Before deleting, we need to update holiday_locations to point to the kept IDs
-- Create a mapping of old IDs to new IDs
CREATE TEMP TABLE location_id_mapping AS
SELECT
    l_dup.id as old_id,
    l_keep.id as new_id
FROM locations l_dup
JOIN locations l_keep ON l_dup.type = l_keep.type AND l_dup.code = l_keep.code
WHERE l_dup.id != l_keep.id
  AND l_keep.id IN (SELECT id FROM locations_to_keep);

-- Update holiday_locations to use the kept location IDs
UPDATE holiday_locations hl
SET location_id = m.new_id
FROM location_id_mapping m
WHERE hl.location_id = m.old_id;

-- Remove duplicate holiday_location relationships (same holiday + location)
DELETE FROM holiday_locations
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY holiday_id, location_id ORDER BY created_at ASC) as rn
        FROM holiday_locations
    ) t
    WHERE t.rn > 1
);

-- Now delete duplicate locations
DELETE FROM locations
WHERE id NOT IN (SELECT id FROM locations_to_keep);

-- Verify results
DO $$
DECLARE
    location_count INTEGER;
    country_count INTEGER;
    state_count INTEGER;
    municipality_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO location_count FROM locations;
    SELECT COUNT(*) INTO country_count FROM locations WHERE type = 'country';
    SELECT COUNT(*) INTO state_count FROM locations WHERE type = 'state';
    SELECT COUNT(*) INTO municipality_count FROM locations WHERE type = 'municipality';

    RAISE NOTICE '✅ Cleanup completed:';
    RAISE NOTICE '   Total locations: %', location_count;
    RAISE NOTICE '   Countries: %', country_count;
    RAISE NOTICE '   States: %', state_count;
    RAISE NOTICE '   Municipalities: %', municipality_count;
END $$;
