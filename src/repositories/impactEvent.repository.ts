import { BaseRepository } from './base.repository';
import { ImpactEvent, ImpactEventQueryParams } from '@/types';

export class ImpactEventRepository extends BaseRepository {
  constructor() {
    super('impact_events');
  }

  private selectClause(): string {
    return `
      SELECT
        id,
        slug,
        name,
        starts_at AS "startsAt",
        ends_at AS "endsAt",
        local_date AS "localDate",
        year,
        category,
        impact_level AS "impactLevel",
        impact_scope AS "impactScope",
        impact_type AS "impactType",
        country_code AS "countryCode",
        location_code AS "locationCode",
        timezone,
        description,
        business_impact_hint AS "businessImpactHint",
        is_holiday AS "isHoliday",
        status,
        source_name AS "sourceName",
        source_url AS "sourceUrl",
        metadata,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM impact_events
    `;
  }

  async findImpactEventById(id: string): Promise<ImpactEvent | null> {
    const query = `${this.selectClause()} WHERE id = $1`;
    return this.queryOne<ImpactEvent>(query, [id]);
  }

  async findNext(startDate: string, limit: number, country = 'BR'): Promise<ImpactEvent[]> {
    const query = `
      ${this.selectClause()}
      WHERE local_date >= $1
        AND country_code = $2
        AND status IN ('scheduled', 'tentative')
      ORDER BY starts_at ASC, name ASC
      LIMIT $3
    `;
    return this.query<ImpactEvent>(query, [startDate, country, limit]);
  }

  async findWithFilters(
    filters: ImpactEventQueryParams
  ): Promise<{ data: ImpactEvent[]; total: number }> {
    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramIndex = 1;

    if (filters.year) {
      conditions.push(`year = $${paramIndex++}`);
      params.push(filters.year);
    }

    if (filters.country) {
      conditions.push(`country_code = $${paramIndex++}`);
      params.push(filters.country.toUpperCase());
    }

    if (filters.category) {
      conditions.push(`category = $${paramIndex++}`);
      params.push(filters.category);
    }

    if (filters.impactLevel) {
      conditions.push(`impact_level = $${paramIndex++}`);
      params.push(filters.impactLevel);
    }

    if (filters.impactScope) {
      conditions.push(`impact_scope = $${paramIndex++}`);
      params.push(filters.impactScope);
    }

    if (filters.location) {
      conditions.push(`(UPPER(location_code) = UPPER($${paramIndex}) OR impact_scope = 'national')`);
      params.push(filters.location.toUpperCase());
      paramIndex++;
    }

    if (filters.startDate) {
      conditions.push(`local_date >= $${paramIndex++}`);
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      conditions.push(`local_date <= $${paramIndex++}`);
      params.push(filters.endDate);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const countResult = await this.queryOne<{ count: string }>(
      `SELECT COUNT(*) AS count FROM impact_events ${whereClause}`,
      params
    );

    const total = countResult ? parseInt(countResult.count, 10) : 0;
    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const offset = (page - 1) * limit;

    const data = await this.query<ImpactEvent>(
      `
        ${this.selectClause()}
        ${whereClause}
        ORDER BY starts_at ASC, name ASC
        LIMIT $${paramIndex++} OFFSET $${paramIndex}
      `,
      [...params, limit, offset]
    );

    return { data, total };
  }

  async findByLocationCodesAndDateRange(
    locationCodes: string[],
    startDate: string,
    endDate: string
  ): Promise<ImpactEvent[]> {
    const nonCountryCodes = locationCodes.filter((c) => c !== 'BR').map((c) => c.toUpperCase());
    let whereClause: string;
    const params: unknown[] = [startDate, endDate, 'BR'];

    if (nonCountryCodes.length > 0) {
      whereClause = `
        WHERE local_date >= $1 AND local_date <= $2
          AND country_code = $3
          AND status IN ('scheduled', 'tentative')
          AND (impact_scope = 'national' OR UPPER(location_code) = ANY($4::text[]))
      `;
      params.push(nonCountryCodes);
    } else {
      whereClause = `
        WHERE local_date >= $1 AND local_date <= $2
          AND country_code = $3
          AND status IN ('scheduled', 'tentative')
          AND impact_scope = 'national'
      `;
    }

    return this.query<ImpactEvent>(
      `${this.selectClause()} ${whereClause} ORDER BY starts_at ASC, name ASC`,
      params
    );
  }
}

export const impactEventRepository = new ImpactEventRepository();
