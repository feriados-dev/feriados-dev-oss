import { dataStatusRepository } from '@repositories/dataStatus.repository';
import { DataStatusResult, HolidayType } from '@/types';

function emptyHolidayTypeCounts(): Record<HolidayType, number> {
  return {
    national: 0,
    state: 0,
    municipal: 0,
    optional: 0,
  };
}

function toIsoString(value: Date | null): string | null {
  return value ? value.toISOString() : null;
}

export class DataStatusService {
  async getStatus(): Promise<DataStatusResult> {
    const [
      supportedCountries,
      years,
      locationTotals,
      holidayTotalsByType,
      coverageByYearRows,
      lastUpdated,
    ] = await Promise.all([
      dataStatusRepository.getSupportedCountries(),
      dataStatusRepository.getCoveredYears(),
      dataStatusRepository.getLocationTotals(),
      dataStatusRepository.getHolidayTotalsByType(),
      dataStatusRepository.getCoverageByYear(),
      dataStatusRepository.getLastUpdated(),
    ]);

    const holidaysByType = emptyHolidayTypeCounts();
    let holidayTotal = 0;

    for (const row of holidayTotalsByType) {
      const total = parseInt(row.total, 10);
      holidaysByType[row.type] = total;
      holidayTotal += total;
    }

    const coverageByYearMap = new Map<number, DataStatusResult['coverageByYear'][number]>();
    for (const row of coverageByYearRows) {
      const coverage = coverageByYearMap.get(row.year) ?? {
        year: row.year,
        total: 0,
        byType: emptyHolidayTypeCounts(),
      };
      const total = parseInt(row.total, 10);
      coverage.total += total;
      coverage.byType[row.type] = total;
      coverageByYearMap.set(row.year, coverage);
    }

    const byCountry = Object.fromEntries(
      supportedCountries.map((country) => [country.code, years])
    );

    return {
      supportedCountries,
      yearsCovered: {
        all: years,
        byCountry,
      },
      totals: {
        ...locationTotals,
        holidays: holidayTotal,
        holidaysByType,
      },
      coverageByYear: Array.from(coverageByYearMap.values()),
      lastUpdated: {
        overall: toIsoString(lastUpdated.overall),
        holidays: toIsoString(lastUpdated.holidays),
        locations: toIsoString(lastUpdated.locations),
        holidayLocations: toIsoString(lastUpdated.holidayLocations),
      },
      knownGaps: [],
    };
  }
}

export const dataStatusService = new DataStatusService();
