-- Database initialization script for the self-hosted Feriados Brasil API.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('country', 'state', 'municipality')),
    code VARCHAR(80) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    state_code VARCHAR(2),
    ibge_code VARCHAR(7),
    parent_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS holidays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    year INTEGER NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('national', 'state', 'municipal', 'optional')),
    description TEXT,
    is_fixed BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS holiday_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    holiday_id UUID NOT NULL REFERENCES holidays(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(holiday_id, location_id)
);

CREATE TABLE IF NOT EXISTS schema_migrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_changelog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    change_date DATE NOT NULL,
    change_type VARCHAR(30) NOT NULL CHECK (change_type IN ('added', 'updated', 'removed', 'scope_changed')),
    entity_type VARCHAR(30) NOT NULL CHECK (entity_type IN ('holiday', 'location')),
    entity_id UUID,
    location_code VARCHAR(80),
    holiday_date DATE,
    year INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    source_name VARCHAR(255),
    source_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS impact_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(160) NOT NULL,
    name VARCHAR(255) NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ,
    local_date DATE NOT NULL,
    year INTEGER NOT NULL,
    category VARCHAR(30) NOT NULL CHECK (category IN ('sports', 'civic', 'infrastructure', 'cultural', 'commerce', 'weather', 'other')),
    impact_level VARCHAR(20) NOT NULL CHECK (impact_level IN ('low', 'medium', 'high', 'critical')),
    impact_scope VARCHAR(20) NOT NULL CHECK (impact_scope IN ('national', 'state', 'municipality')),
    impact_type VARCHAR(80) NOT NULL,
    country_code VARCHAR(2) NOT NULL DEFAULT 'BR',
    location_code VARCHAR(80),
    timezone VARCHAR(80) NOT NULL DEFAULT 'America/Sao_Paulo',
    description TEXT,
    business_impact_hint TEXT,
    is_holiday BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'tentative', 'cancelled')),
    source_name VARCHAR(255),
    source_url TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (ends_at IS NULL OR starts_at <= ends_at),
    UNIQUE(slug, country_code)
);

CREATE INDEX IF NOT EXISTS idx_holidays_date ON holidays(date);
CREATE INDEX IF NOT EXISTS idx_holidays_year ON holidays(year);
CREATE INDEX IF NOT EXISTS idx_holidays_type ON holidays(type);
CREATE INDEX IF NOT EXISTS idx_holiday_locations_holiday ON holiday_locations(holiday_id);
CREATE INDEX IF NOT EXISTS idx_holiday_locations_location ON holiday_locations(location_id);
CREATE INDEX IF NOT EXISTS idx_locations_type ON locations(type);
CREATE INDEX IF NOT EXISTS idx_locations_code ON locations(code);
CREATE INDEX IF NOT EXISTS idx_locations_state_code ON locations(state_code);
CREATE INDEX IF NOT EXISTS idx_data_changelog_date ON data_changelog(change_date DESC);
CREATE INDEX IF NOT EXISTS idx_data_changelog_location ON data_changelog(location_code);
CREATE INDEX IF NOT EXISTS idx_data_changelog_year ON data_changelog(year);
CREATE INDEX IF NOT EXISTS idx_impact_events_year ON impact_events(year);
CREATE INDEX IF NOT EXISTS idx_impact_events_country_date ON impact_events(country_code, local_date);
CREATE INDEX IF NOT EXISTS idx_impact_events_category ON impact_events(category);
CREATE INDEX IF NOT EXISTS idx_impact_events_impact_level ON impact_events(impact_level);
CREATE INDEX IF NOT EXISTS idx_impact_events_location ON impact_events(location_code);

INSERT INTO locations (type, code, name, parent_id)
VALUES ('country', 'BR', 'Brasil', NULL)
ON CONFLICT (code) DO NOTHING;

INSERT INTO locations (type, code, name, state_code, parent_id)
SELECT 'state', code, name, code, (SELECT id FROM locations WHERE code = 'BR')
FROM (VALUES
    ('AC', 'Acre'),
    ('AL', 'Alagoas'),
    ('AP', 'Amapa'),
    ('AM', 'Amazonas'),
    ('BA', 'Bahia'),
    ('CE', 'Ceara'),
    ('DF', 'Distrito Federal'),
    ('ES', 'Espirito Santo'),
    ('GO', 'Goias'),
    ('MA', 'Maranhao'),
    ('MT', 'Mato Grosso'),
    ('MS', 'Mato Grosso do Sul'),
    ('MG', 'Minas Gerais'),
    ('PA', 'Para'),
    ('PB', 'Paraiba'),
    ('PR', 'Parana'),
    ('PE', 'Pernambuco'),
    ('PI', 'Piaui'),
    ('RJ', 'Rio de Janeiro'),
    ('RN', 'Rio Grande do Norte'),
    ('RS', 'Rio Grande do Sul'),
    ('RO', 'Rondonia'),
    ('RR', 'Roraima'),
    ('SC', 'Santa Catarina'),
    ('SP', 'Sao Paulo'),
    ('SE', 'Sergipe'),
    ('TO', 'Tocantins')
) AS states(code, name)
ON CONFLICT (code) DO NOTHING;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_locations_updated_at ON locations;
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_holidays_updated_at ON holidays;
CREATE TRIGGER update_holidays_updated_at BEFORE UPDATE ON holidays
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_impact_events_updated_at ON impact_events;
CREATE TRIGGER update_impact_events_updated_at BEFORE UPDATE ON impact_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
