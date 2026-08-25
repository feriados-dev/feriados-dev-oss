export type LocationType = 'country' | 'state' | 'municipality';
export type HolidayType = 'national' | 'state' | 'municipal' | 'optional';
export type ImpactEventCategory =
  | 'sports'
  | 'civic'
  | 'infrastructure'
  | 'cultural'
  | 'commerce'
  | 'weather'
  | 'other';
export type ImpactEventLevel = 'low' | 'medium' | 'high' | 'critical';
export type ImpactEventScope = 'national' | 'state' | 'municipality';
export type ImpactEventStatus = 'scheduled' | 'tentative' | 'cancelled';

export interface Location {
  id: string;
  type: LocationType;
  code: string;
  name: string;
  stateCode?: string;
  ibgeCode?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  year: number;
  type: HolidayType;
  description?: string;
  isFixed: boolean;
  locations?: Location[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ImpactEvent {
  id: string;
  slug: string;
  name: string;
  startsAt: Date;
  endsAt?: Date;
  localDate: string;
  year: number;
  category: ImpactEventCategory;
  impactLevel: ImpactEventLevel;
  impactScope: ImpactEventScope;
  impactType: string;
  countryCode: string;
  locationCode?: string;
  timezone: string;
  description?: string;
  businessImpactHint?: string;
  isHoliday: boolean;
  status: ImpactEventStatus;
  sourceName?: string;
  sourceUrl?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface HolidayQueryParams extends Partial<PaginationParams> {
  year?: number;
  state?: string;
  city?: string;
  location?: string;
  locationCodes?: string[];
  type?: HolidayType;
  startDate?: string;
  endDate?: string;
}

export interface ImpactEventQueryParams extends Partial<PaginationParams> {
  year?: number;
  country?: string;
  category?: ImpactEventCategory;
  impactLevel?: ImpactEventLevel;
  impactScope?: ImpactEventScope;
  location?: string;
  startDate?: string;
  endDate?: string;
}

export interface LocationQueryParams extends Partial<PaginationParams> {
  type?: LocationType;
  state?: string;
}

export interface HolidayCheckResult {
  date: string;
  location: string;
  isHoliday: boolean;
  types: HolidayType[];
  holidays: Holiday[];
}

export interface HolidayCompareLocation {
  input: string;
  code: string;
  name: string;
  type: LocationType;
}

export interface HolidayCompareResult {
  year: number;
  normalizedLocations: HolidayCompareLocation[];
  commonHolidays: Holiday[];
  onlyInLocation: Record<string, Holiday[]>;
  totalByLocation: Record<string, number>;
}

export type LongWeekendType = 'long_weekend' | 'bridge';

export interface LongWeekendResult {
  startDate: string;
  endDate: string;
  days: number;
  type: LongWeekendType;
  bridgeDays: string[];
  holidays: Holiday[];
}

export interface BusinessDayCheckResult {
  date: string;
  location: string;
  isBusinessDay: boolean;
  isWeekend: boolean;
  holidays: Holiday[];
}

export interface BusinessDayCountResult {
  from: string;
  to: string;
  location: string;
  businessDays: number;
  calendarDays: number;
  weekends: number;
  holidays: Holiday[];
}

export interface BusinessDayAddResult {
  startDate: string;
  resultDate: string;
  location: string;
  days: number;
  direction: 'forward' | 'backward' | 'none';
  holidays: Holiday[];
}

export interface BusinessDayNextResult {
  inputDate: string;
  resultDate: string;
  location: string;
  includeCurrent: boolean;
  skippedDays: number;
  holidays: Holiday[];
}

export interface CalendarMonthDay {
  date: string;
  day: number;
  weekday: number;
  isWeekend: boolean;
  isHoliday: boolean;
  isBusinessDay: boolean;
  holidays: Holiday[];
}

export interface CalendarMonthResult {
  year: number;
  month: number;
  location: string;
  days: CalendarMonthDay[];
  summary: {
    calendarDays: number;
    businessDays: number;
    weekends: number;
    holidays: number;
  };
}

export interface DataStatusResult {
  supportedCountries: Array<{
    code: string;
    name: string;
  }>;
  yearsCovered: {
    all: number[];
    byCountry: Record<string, number[]>;
  };
  totals: {
    states: number;
    municipalities: number;
    holidays: number;
    holidaysByType: Record<HolidayType, number>;
  };
  coverageByYear: Array<{
    year: number;
    total: number;
    byType: Record<HolidayType, number>;
  }>;
  lastUpdated: {
    overall: string | null;
    holidays: string | null;
    locations: string | null;
    holidayLocations: string | null;
  };
  knownGaps: string[];
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
}
