export type DataChangelogChangeType = 'added' | 'updated' | 'removed' | 'scope_changed';

export interface DataChangelogLocation {
  code: string;
  name: string;
  type: 'country' | 'state' | 'municipality';
}

export interface DataChangelogEntry {
  id: string;
  dateChanged: string;
  holidayName: string;
  holidayDate: string;
  changeType: DataChangelogChangeType;
  affectedLocations: DataChangelogLocation[];
  source?: string;
  summary: string;
}
