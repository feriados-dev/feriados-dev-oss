import { config } from '@config/env';

interface CacheEntry {
  value: string;
  expiresAt: number;
}

export class CacheService {
  private readonly defaultTtl: number;
  private readonly store = new Map<string, CacheEntry>();

  constructor() {
    this.defaultTtl = config.cache.cacheTtl;
  }

  private generateKey(namespace: string, identifier: string | object): string {
    const id = typeof identifier === 'string' ? identifier : JSON.stringify(identifier);
    return `${namespace}:${id}`;
  }

  async get<T>(namespace: string, identifier: string | object): Promise<T | null> {
    const key = this.generateKey(namespace, identifier);
    const cached = this.store.get(key);
    if (!cached) return null;

    if (cached.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }

    return JSON.parse(cached.value) as T;
  }

  async set<T>(
    namespace: string,
    identifier: string | object,
    value: T,
    ttl?: number,
  ): Promise<boolean> {
    const key = this.generateKey(namespace, identifier);
    const expiresAt = Date.now() + (ttl ?? this.defaultTtl) * 1000;
    this.store.set(key, { value: JSON.stringify(value), expiresAt });
    return true;
  }

  async invalidatePattern(pattern: string): Promise<number> {
    const prefix = pattern.replace(/\*$/, '');
    let deleted = 0;

    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
        deleted++;
      }
    }

    return deleted;
  }

  async getLocation(code: string): Promise<unknown | null> {
    return this.get('location', code);
  }

  async setLocation(code: string, data: unknown): Promise<boolean> {
    return this.set('location', code, data, 604800);
  }

  async invalidateLocations(): Promise<number> {
    return this.invalidatePattern('location:*');
  }
}

export const cacheService = new CacheService();
