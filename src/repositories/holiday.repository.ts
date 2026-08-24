import { BaseRepository } from './base.repository';
import { Holiday, HolidayQueryParams } from '@/types';

export class HolidayRepository extends BaseRepository {
  constructor() {
    super('holidays');
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Holiday[]> {
    const query = `
      SELECT h.*,
        json_agg(
          json_build_object(
            'id', l.id,
            'type', l.type,
            'code', l.code,
            'name', l.name,
            'stateCode', l.state_code
          )
        ) FILTER (WHERE l.id IS NOT NULL) as locations
      FROM holidays h
      LEFT JOIN holiday_locations hl ON h.id = hl.holiday_id
      LEFT JOIN locations l ON hl.location_id = l.id
      WHERE h.date BETWEEN $1 AND $2
      GROUP BY h.id
      ORDER BY h.date ASC
    `;
    return this.query<Holiday>(query, [startDate, endDate]);
  }

  async findApplicableByLocationDateRange(
    locationCodes: string[],
    startDate: Date,
    endDate: Date
  ): Promise<Holiday[]> {
    const query = `
      SELECT h.*,
        json_agg(
          DISTINCT jsonb_build_object(
            'id', l.id,
            'type', l.type,
            'code', l.code,
            'name', l.name,
            'stateCode', l.state_code
          )
        ) FILTER (WHERE l.id IS NOT NULL) as locations
      FROM holidays h
      INNER JOIN holiday_locations hl ON h.id = hl.holiday_id
      INNER JOIN locations l ON hl.location_id = l.id
      WHERE h.date BETWEEN $1 AND $2
        AND l.code = ANY($3::text[])
      GROUP BY h.id
      ORDER BY h.date ASC
    `;
    return this.query<Holiday>(query, [startDate, endDate, locationCodes]);
  }

  async findNextApplicableByLocation(
    locationCodes: string[],
    startDate: Date,
    limit: number
  ): Promise<Holiday[]> {
    const query = `
      SELECT h.*,
        json_agg(
          DISTINCT jsonb_build_object(
            'id', l.id,
            'type', l.type,
            'code', l.code,
            'name', l.name,
            'stateCode', l.state_code
          )
        ) FILTER (WHERE l.id IS NOT NULL) as locations
      FROM holidays h
      INNER JOIN holiday_locations hl ON h.id = hl.holiday_id
      INNER JOIN locations l ON hl.location_id = l.id
      WHERE h.date >= $1
        AND l.code = ANY($2::text[])
      GROUP BY h.id
      ORDER BY h.date ASC
      LIMIT $3
    `;
    return this.query<Holiday>(query, [startDate, locationCodes, limit]);
  }

  async findByYear(year: number): Promise<Holiday[]> {
    const query = `
      SELECT h.*,
        json_agg(
          json_build_object(
            'id', l.id,
            'type', l.type,
            'code', l.code,
            'name', l.name,
            'stateCode', l.state_code
          )
        ) FILTER (WHERE l.id IS NOT NULL) as locations
      FROM holidays h
      LEFT JOIN holiday_locations hl ON h.id = hl.holiday_id
      LEFT JOIN locations l ON hl.location_id = l.id
      WHERE h.year = $1
      GROUP BY h.id
      ORDER BY h.date ASC
    `;
    return this.query<Holiday>(query, [year]);
  }

  async findByLocation(locationCode: string, year?: number): Promise<Holiday[]> {
    let query = `
      SELECT h.*,
        json_agg(
          json_build_object(
            'id', l.id,
            'type', l.type,
            'code', l.code,
            'name', l.name,
            'stateCode', l.state_code
          )
        ) FILTER (WHERE l.id IS NOT NULL) as locations
      FROM holidays h
      INNER JOIN holiday_locations hl ON h.id = hl.holiday_id
      INNER JOIN locations l ON hl.location_id = l.id
      WHERE l.code = $1
    `;

    const params: (string | number)[] = [locationCode];

    if (year) {
      query += ` AND h.year = $2`;
      params.push(year);
    }

    query += ` GROUP BY h.id ORDER BY h.date ASC`;

    return this.query<Holiday>(query, params);
  }

  async findWithFilters(filters: HolidayQueryParams): Promise<{ data: Holiday[]; total: number }> {
    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramIndex = 1;

    if (filters.year) {
      conditions.push(`h.year = $${paramIndex++}`);
      params.push(filters.year);
    }

    if (filters.type) {
      conditions.push(`h.type = $${paramIndex++}`);
      params.push(filters.type);
    }

    if (filters.startDate) {
      conditions.push(`h.date >= $${paramIndex++}`);
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      conditions.push(`h.date <= $${paramIndex++}`);
      params.push(filters.endDate);
    }

    let locationCondition = '';
    if (filters.locationCodes && filters.locationCodes.length > 0) {
      locationCondition = `
        INNER JOIN holiday_locations hl ON h.id = hl.holiday_id
        INNER JOIN locations l ON hl.location_id = l.id
      `;
      conditions.push(`l.code = ANY($${paramIndex++}::text[])`);
      params.push(filters.locationCodes);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Count query
    const countQuery = `
      SELECT COUNT(DISTINCT h.id) as count
      FROM holidays h
      ${locationCondition}
      ${whereClause}
    `;
    const countResult = await this.queryOne<{ count: string }>(countQuery, params);
    const total = countResult ? parseInt(countResult.count, 10) : 0;

    // Data query with pagination
    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT h.*,
        json_agg(
          json_build_object(
            'id', loc.id,
            'type', loc.type,
            'code', loc.code,
            'name', loc.name,
            'stateCode', loc.state_code
          )
        ) FILTER (WHERE loc.id IS NOT NULL) as locations
      FROM holidays h
      LEFT JOIN holiday_locations hl2 ON h.id = hl2.holiday_id
      LEFT JOIN locations loc ON hl2.location_id = loc.id
      ${locationCondition ? `
        INNER JOIN holiday_locations hl ON h.id = hl.holiday_id
        INNER JOIN locations l ON hl.location_id = l.id
      ` : ''}
      ${whereClause}
      GROUP BY h.id
      ORDER BY h.date ASC
      LIMIT $${paramIndex++} OFFSET $${paramIndex}
    `;
    params.push(limit, offset);

    const data = await this.query<Holiday>(dataQuery, params);

    return { data, total };
  }

  async create(holiday: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>): Promise<Holiday> {
    const query = `
      INSERT INTO holidays (name, date, year, type, description, is_fixed)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await this.queryOne<Holiday>(query, [
      holiday.name,
      holiday.date,
      holiday.year,
      holiday.type,
      holiday.description,
      holiday.isFixed,
    ]);

    if (!result) {
      throw new Error('Failed to create holiday');
    }

    return result;
  }

  async linkLocation(holidayId: string, locationId: string): Promise<void> {
    const query = `
      INSERT INTO holiday_locations (holiday_id, location_id)
      VALUES ($1, $2)
      ON CONFLICT (holiday_id, location_id) DO NOTHING
    `;
    await this.query(query, [holidayId, locationId]);
  }

  async unlinkLocation(holidayId: string, locationId: string): Promise<void> {
    const query = `
      DELETE FROM holiday_locations
      WHERE holiday_id = $1 AND location_id = $2
    `;
    await this.query(query, [holidayId, locationId]);
  }
}

export const holidayRepository = new HolidayRepository();
