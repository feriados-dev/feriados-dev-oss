-- Migration: Remove duplicate holidays
-- This removes duplicate holidays created from multiple migration runs

-- First, let's identify and keep only the oldest entry for each unique holiday
-- (based on name, date, year, type combination)

-- Create a temporary table with the IDs to keep (oldest created_at for each unique holiday)
CREATE TEMP TABLE holidays_to_keep AS
SELECT DISTINCT ON (name, date, year, type) id
FROM holidays
ORDER BY name, date, year, type, created_at ASC;

-- Delete all holidays that are NOT in the keep list
DELETE FROM holidays
WHERE id NOT IN (SELECT id FROM holidays_to_keep);

-- Also clean up orphaned holiday_locations entries (if any)
-- This removes relationships to holidays that no longer exist
DELETE FROM holiday_locations
WHERE holiday_id NOT IN (SELECT id FROM holidays);

-- Verify results
DO $$
DECLARE
    holiday_count INTEGER;
    relation_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO holiday_count FROM holidays;
    SELECT COUNT(*) INTO relation_count FROM holiday_locations;

    RAISE NOTICE '✅ Cleanup completed: % holidays, % holiday-location relationships', holiday_count, relation_count;
END $$;
