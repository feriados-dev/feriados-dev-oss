-- High-impact events that can affect business operations but are not official holidays.

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

CREATE INDEX IF NOT EXISTS idx_impact_events_year
    ON impact_events(year);

CREATE INDEX IF NOT EXISTS idx_impact_events_country_date
    ON impact_events(country_code, local_date);

CREATE INDEX IF NOT EXISTS idx_impact_events_category
    ON impact_events(category);

CREATE INDEX IF NOT EXISTS idx_impact_events_impact_level
    ON impact_events(impact_level);

CREATE INDEX IF NOT EXISTS idx_impact_events_location
    ON impact_events(location_code);

DROP TRIGGER IF EXISTS update_impact_events_updated_at ON impact_events;
CREATE TRIGGER update_impact_events_updated_at BEFORE UPDATE ON impact_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
