-- Migration: Increase code and ibge_code field lengths
-- This allows loading all municipalities from IBGE

-- Increase ibge_code from VARCHAR(7) to VARCHAR(20) to support all IBGE codes
ALTER TABLE locations
ALTER COLUMN ibge_code TYPE VARCHAR(20);

-- Increase code from VARCHAR(10) to VARCHAR(50) to support longer municipality codes
ALTER TABLE locations
ALTER COLUMN code TYPE VARCHAR(50);

-- Create index on ibge_code for faster queries
CREATE INDEX IF NOT EXISTS idx_locations_ibge_code ON locations(ibge_code);
