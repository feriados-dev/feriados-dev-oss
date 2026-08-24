import { BaseRepository } from './base.repository';
import { Location, LocationType } from '@/types';

interface LocationQuery {
  type?: LocationType;
  state?: string;
  page: number;
  limit: number;
}

interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class LocationRepository extends BaseRepository {
  constructor() {
    super('locations');
  }

  async findByCode(code: string): Promise<Location | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE code = $1`;
    return this.queryOne<Location>(query, [code]);
  }

  async findByCodeCaseInsensitive(code: string): Promise<Location | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE UPPER(code) = UPPER($1)`;
    return this.queryOne<Location>(query, [code]);
  }

  async findByType(type: LocationType): Promise<Location[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE type = $1 ORDER BY name ASC`;
    return this.query<Location>(query, [type]);
  }

  async findByState(stateCode: string): Promise<Location[]> {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE state_code = $1 AND type = 'municipality'
      ORDER BY name ASC
    `;
    return this.query<Location>(query, [stateCode]);
  }

  async findStates(): Promise<Location[]> {
    return this.findByType('state');
  }

  async findMunicipalities(stateCode?: string): Promise<Location[]> {
    if (stateCode) {
      return this.findByState(stateCode);
    }
    return this.findByType('municipality');
  }

  async create(location: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>): Promise<Location> {
    const query = `
      INSERT INTO ${this.tableName} (type, code, name, state_code, ibge_code, parent_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await this.queryOne<Location>(query, [
      location.type,
      location.code,
      location.name,
      location.stateCode,
      location.ibgeCode,
      location.parentId,
    ]);

    if (!result) {
      throw new Error('Failed to create location');
    }

    return result;
  }

  async search(searchTerm: string, limit = 20): Promise<Location[]> {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE name ILIKE $1 OR code ILIKE $1
      ORDER BY type, name ASC
      LIMIT $2
    `;
    return this.query<Location>(query, [`%${searchTerm}%`, limit]);
  }

  async findWithPagination(query: LocationQuery): Promise<PaginatedResult<Location>> {
    const { type, state, page, limit } = query;
    const offset = (page - 1) * limit;

    // Build WHERE clause dynamically
    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramCount = 1;

    if (type) {
      conditions.push(`type = $${paramCount}`);
      params.push(type);
      paramCount++;
    }

    if (state) {
      conditions.push(`state_code = $${paramCount}`);
      params.push(state);
      paramCount++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM ${this.tableName} ${whereClause}`;
    const countResult = await this.queryOne<{ count: string }>(countQuery, params);
    const total = parseInt(countResult?.count || '0', 10);

    // Get paginated data
    const dataQuery = `
      SELECT * FROM ${this.tableName}
      ${whereClause}
      ORDER BY type, name ASC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
    const data = await this.query<Location>(dataQuery, [...params, limit, offset]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export const locationRepository = new LocationRepository();
