import { BaseRepository } from './base.repository';
import { HolidayType } from '@/types';

interface SupportedCountryRow {
  code: string;
  name: string;
}

interface YearsRow {
  years: number[] | null;
}

interface LocationTotalsRow {
  states: string;
  municipalities: string;
}

interface HolidayTypeTotalRow {
  type: HolidayType;
  total: string;
}

interface CoverageByYearRow {
  year: number;
  type: HolidayType;
  total: string;
}

interface LastUpdatedRow {
  holidays: Date | null;
  locations: Date | null;
  holidayLocations: Date | null;
  overall: Date | null;
}

export class DataStatusRepository extends BaseRepository {
  constructor() {
    super('data_status');
  }

  async getSupportedCountries(): Promise<SupportedCountryRow[]> {
    const query = `
      SELECT code, name
      FROM locations
      WHERE type = 'country'
      ORDER BY code ASC
    `;
    return this.query<SupportedCountryRow>(query);
  }

  async getCoveredYears(): Promise<number[]> {
    const query = `
      SELECT array_agg(DISTINCT year ORDER BY year) AS years
      FROM holidays
    `;
    const row = await this.queryOne<YearsRow>(query);
    return row?.years ?? [];
  }

  async getLocationTotals(): Promise<{ states: number; municipalities: number }> {
    const query = `
      SELECT
        COUNT(*) FILTER (WHERE type = 'state') AS states,
        COUNT(*) FILTER (WHERE type = 'municipality') AS municipalities
      FROM locations
    `;
    const row = await this.queryOne<LocationTotalsRow>(query);
    return {
      states: parseInt(row?.states ?? '0', 10),
      municipalities: parseInt(row?.municipalities ?? '0', 10),
    };
  }

  async getHolidayTotalsByType(): Promise<HolidayTypeTotalRow[]> {
    const query = `
      SELECT type, COUNT(*) AS total
      FROM holidays
      GROUP BY type
      ORDER BY type ASC
    `;
    return this.query<HolidayTypeTotalRow>(query);
  }

  async getCoverageByYear(): Promise<CoverageByYearRow[]> {
    const query = `
      SELECT year, type, COUNT(*) AS total
      FROM holidays
      GROUP BY year, type
      ORDER BY year ASC, type ASC
    `;
    return this.query<CoverageByYearRow>(query);
  }

  async getLastUpdated(): Promise<LastUpdatedRow> {
    const query = `
      SELECT
        (SELECT MAX(updated_at) FROM holidays) AS holidays,
        (SELECT MAX(updated_at) FROM locations) AS locations,
        (SELECT MAX(created_at) FROM holiday_locations) AS "holidayLocations",
        GREATEST(
          (SELECT MAX(updated_at) FROM holidays),
          (SELECT MAX(updated_at) FROM locations),
          (SELECT MAX(created_at) FROM holiday_locations)
        ) AS overall
    `;
    return (await this.queryOne<LastUpdatedRow>(query)) ?? {
      holidays: null,
      locations: null,
      holidayLocations: null,
      overall: null,
    };
  }
}

export const dataStatusRepository = new DataStatusRepository();
