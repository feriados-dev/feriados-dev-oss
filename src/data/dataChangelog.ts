import type { DataChangelogEntry } from '@/types/dataChangelog';

export const DATA_CHANGELOG_ENTRIES: DataChangelogEntry[] = [
  {
    id: '2026-05-14-cobertura-inicial-dados-oficiais',
    dateChanged: '2026-05-14',
    holidayName: 'Cobertura inicial de feriados oficiais',
    holidayDate: '2026-01-01',
    changeType: 'added',
    affectedLocations: [
      {
        code: 'BR',
        name: 'Brasil',
        type: 'country',
      },
    ],
    summary:
      'Publicada a primeira entrada do changelog de dados para rastrear adições, correções, remoções e mudanças de escopo nos feriados oficiais.',
  },
];
