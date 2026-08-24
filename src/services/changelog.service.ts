import { CHANGELOG_ENTRIES } from '@/generated/changelog-data';
import type { ChangelogEntry, ChangelogType } from '@/types/changelog';

export interface ChangelogQuery {
  limit?: number;
  offset?: number;
  type?: ChangelogType;
  since?: string;
}

class ChangelogService {
  list(query: ChangelogQuery = {}): { entries: ChangelogEntry[]; total: number } {
    let result = CHANGELOG_ENTRIES;

    if (query.type) {
      result = result.filter((e) => e.type === query.type);
    }
    if (query.since) {
      result = result.filter((e) => e.date >= query.since!);
    }

    const total = result.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 20;
    return { entries: result.slice(offset, offset + limit), total };
  }

  rss(siteUrl: string): string {
    const items = CHANGELOG_ENTRIES.slice(0, 50)
      .map((e) => {
        const link = `${siteUrl}/changelog/${e.id}`;
        const pubDate = new Date(`${e.date}T00:00:00Z`).toUTCString();
        return `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(e.id)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(e.type)}</category>
      <description>${escapeXml(e.summary)}</description>
    </item>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Feriados.dev API — Changelog</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Últimos lançamentos, melhorias e correções da API de Feriados do Brasil</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`;
  }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const changelogService = new ChangelogService();
