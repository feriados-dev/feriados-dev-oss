-- Migration: Create migrations tracking table
-- This prevents seeds from running multiple times

-- Create a table to track which migrations/seeds have been run
CREATE TABLE IF NOT EXISTS schema_migrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mark all existing seeds as executed to prevent re-running
INSERT INTO schema_migrations (migration_name)
VALUES
    ('01-brazil-location'),
    ('02-municipalities'),
    ('03-national-holidays'),
    ('04-state-holidays'),
    ('05-municipal-holidays')
ON CONFLICT (migration_name) DO NOTHING;

-- Clean up any duplicate holidays that were added again
DELETE FROM holidays
WHERE id NOT IN (
    SELECT DISTINCT ON (name, date, year, type) id
    FROM holidays
    ORDER BY name, date, year, type, created_at ASC
);

-- Verify final counts
DO $$
DECLARE
    holiday_count INTEGER;
    location_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO holiday_count FROM holidays;
    SELECT COUNT(*) INTO location_count FROM locations;

    RAISE NOTICE '✅ Final counts: % holidays, % locations', holiday_count, location_count;
END $$;
