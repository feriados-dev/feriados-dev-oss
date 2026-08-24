import { locationRepository } from '@repositories/location.repository';
import { cacheService } from './cache.service';
import { Location, LocationType } from '@/types';
import { NotFoundError } from '@utils/errors';
import { logger } from '@utils/logger';

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

export class LocationService {
  async getLocationById(id: string): Promise<Location> {
    const location = await locationRepository.findById<Location>(id);

    if (!location) {
      throw new NotFoundError('Location not found');
    }

    return location;
  }

  async getLocationByCode(code: string): Promise<Location> {
    // Try cache first
    const cached = await cacheService.getLocation(code);

    if (cached) {
      logger.debug('Location retrieved from cache', { code });
      return cached as Location;
    }

    // Fetch from database
    const location = await locationRepository.findByCode(code)
      ?? await locationRepository.findByCodeCaseInsensitive(code);

    if (!location) {
      throw new NotFoundError(`Location with code ${code} not found`);
    }

    // Store in cache
    await cacheService.setLocation(code, location);
    if (location.code !== code) {
      await cacheService.setLocation(location.code, location);
    }

    return location;
  }

  async getStates(): Promise<Location[]> {
    const cacheKey = 'all-states';
    const cached = await cacheService.get<Location[]>('locations', cacheKey);

    if (cached) {
      logger.debug('States retrieved from cache');
      return cached;
    }

    const states = await locationRepository.findStates();

    await cacheService.set('locations', cacheKey, states, 604800); // 7 days

    return states;
  }

  async getMunicipalities(stateCode?: string): Promise<Location[]> {
    const cacheKey = stateCode ? `municipalities-${stateCode}` : 'all-municipalities';
    const cached = await cacheService.get<Location[]>('locations', cacheKey);

    if (cached) {
      logger.debug('Municipalities retrieved from cache', { stateCode });
      return cached;
    }

    const municipalities = await locationRepository.findMunicipalities(stateCode);

    await cacheService.set('locations', cacheKey, municipalities, 604800); // 7 days

    return municipalities;
  }

  async searchLocations(searchTerm: string, limit = 20): Promise<Location[]> {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    return locationRepository.search(searchTerm, limit);
  }

  async getLocationsByType(type: LocationType): Promise<Location[]> {
    const cacheKey = `type-${type}`;
    const cached = await cacheService.get<Location[]>('locations', cacheKey);

    if (cached) {
      logger.debug('Locations by type retrieved from cache', { type });
      return cached;
    }

    const locations = await locationRepository.findByType(type);

    await cacheService.set('locations', cacheKey, locations, 604800); // 7 days

    return locations;
  }

  async getLocations(query: LocationQuery): Promise<PaginatedResult<Location>> {
    const { type, state, page, limit } = query;

    // Build cache key based on query params
    const cacheKey = `locations-${type || 'all'}-${state || 'all'}-${page}-${limit}`;
    const cached = await cacheService.get<PaginatedResult<Location>>('locations', cacheKey);

    if (cached) {
      logger.debug('Locations retrieved from cache', { type, state, page, limit });
      return cached;
    }

    // Get paginated data from repository
    const result = await locationRepository.findWithPagination({
      type,
      state,
      page,
      limit,
    });

    // Cache the result
    await cacheService.set('locations', cacheKey, result, 3600); // 1 hour for paginated results

    return result;
  }

  async createLocation(
    locationData: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Location> {
    const location = await locationRepository.create(locationData);

    // Invalidate cache
    await cacheService.invalidateLocations();

    logger.info('Location created', { locationId: location.id, code: location.code });

    return location;
  }
}

export const locationService = new LocationService();
