import { DATA_CHANGELOG_ENTRIES } from '@/data/dataChangelog';
import type { DataChangelogChangeType, DataChangelogEntry } from '@/types/dataChangelog';

export interface DataChangelogQuery {
  limit?: number;
  offset?: number;
  changeType?: DataChangelogChangeType;
  location?: string;
  since?: string;
  until?: string;
}

export class DataChangelogService {
  constructor(private readonly entries: DataChangelogEntry[] = DATA_CHANGELOG_ENTRIES) {}

  list(query: DataChangelogQuery = {}): { entries: DataChangelogEntry[]; total: number } {
    let result = [...this.entries].sort((a, b) => b.dateChanged.localeCompare(a.dateChanged));

    if (query.changeType) {
      result = result.filter((entry) => entry.changeType === query.changeType);
    }

    if (query.location) {
      const location = query.location.toLowerCase();
      result = result.filter((entry) =>
        entry.affectedLocations.some(
          (affected) =>
            affected.code.toLowerCase() === location || affected.name.toLowerCase() === location,
        ),
      );
    }

    if (query.since) {
      result = result.filter((entry) => entry.dateChanged >= query.since!);
    }

    if (query.until) {
      result = result.filter((entry) => entry.dateChanged <= query.until!);
    }

    const total = result.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 20;

    return { entries: result.slice(offset, offset + limit), total };
  }

  rss(siteUrl: string): string {
    const items = this.list({ limit: 50 }).entries
      .map((entry) => {
        const link = `${siteUrl}/v1/data/changelog#${entry.id}`;
        const pubDate = new Date(`${entry.dateChanged}T00:00:00Z`).toUTCString();
        return `    <item>
      <title>${escapeXml(entry.summary)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(entry.id)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(entry.changeType)}</category>
      <description>${escapeXml(`${entry.holidayName} (${entry.holidayDate})`)}</description>
    </item>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Feriados.dev API - Changelog de dados</title>
    <link>${escapeXml(`${siteUrl}/v1/data/changelog`)}</link>
    <description>Atualizações nos dados oficiais de feriados expostos pela API</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`;
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const dataChangelogService = new DataChangelogService();
