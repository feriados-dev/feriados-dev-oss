import { DataChangelogService } from '../../../src/services/dataChangelog.service';
import type { DataChangelogEntry } from '../../../src/types/dataChangelog';

const entries: DataChangelogEntry[] = [
  {
    id: 'older',
    dateChanged: '2026-05-01',
    holidayName: 'Feriado estadual',
    holidayDate: '2026-07-09',
    changeType: 'updated',
    affectedLocations: [{ code: 'SP', name: 'São Paulo', type: 'state' }],
    summary: 'Atualização estadual.',
  },
  {
    id: 'newer',
    dateChanged: '2026-05-10',
    holidayName: 'Feriado municipal',
    holidayDate: '2026-01-25',
    changeType: 'added',
    affectedLocations: [{ code: 'SP-SAO-PAULO', name: 'São Paulo', type: 'municipality' }],
    summary: 'Adição municipal.',
  },
  {
    id: 'middle',
    dateChanged: '2026-05-05',
    holidayName: 'Feriado nacional',
    holidayDate: '2026-04-21',
    changeType: 'removed',
    affectedLocations: [{ code: 'BR', name: 'Brasil', type: 'country' }],
    summary: 'Remoção nacional.',
  },
];

describe('DataChangelogService', () => {
  const service = new DataChangelogService(entries);

  it('orders entries by change date desc', () => {
    const result = service.list();

    expect(result.entries.map((entry) => entry.id)).toEqual(['newer', 'middle', 'older']);
  });

  it('filters by change type, affected location and period', () => {
    const result = service.list({
      changeType: 'added',
      location: 'SP-SAO-PAULO',
      since: '2026-05-01',
      until: '2026-05-31',
    });

    expect(result.total).toBe(1);
    expect(result.entries[0].id).toBe('newer');
  });

  it('supports pagination after filters are applied', () => {
    const result = service.list({ limit: 1, offset: 1 });

    expect(result.total).toBe(3);
    expect(result.entries.map((entry) => entry.id)).toEqual(['middle']);
  });
});
