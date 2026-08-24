import { pool } from '@config/database';
import { logger } from '@utils/logger';

export abstract class BaseRepository {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async query<T>(text: string, params?: unknown[]): Promise<T[]> {
    const start = Date.now();
    try {
      const result = await pool.query(text, params);
      const duration = Date.now() - start;
      logger.debug('Query executed', {
        table: this.tableName,
        duration,
        rows: result.rowCount,
      });
      return result.rows as T[];
    } catch (error) {
      logger.error('Query error', { table: this.tableName, text, error });
      throw error;
    }
  }

  protected async queryOne<T>(text: string, params?: unknown[]): Promise<T | null> {
    const results = await this.query<T>(text, params);
    return results.length > 0 ? results[0] : null;
  }

  async findById<T>(id: string): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    return this.queryOne<T>(query, [id]);
  }

  async findAll<T>(limit = 100, offset = 0): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
    return this.query<T>(query, [limit, offset]);
  }

  async count(): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
    const result = await this.queryOne<{ count: string }>(query);
    return result ? parseInt(result.count, 10) : 0;
  }

  async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`;
    const result = await this.queryOne(query, [id]);
    return result !== null;
  }
}
