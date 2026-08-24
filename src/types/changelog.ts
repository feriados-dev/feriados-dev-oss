export type ChangelogType = 'feature' | 'improvement' | 'fix' | 'breaking' | 'announcement';

export interface ChangelogEntry {
  id: string;
  date: string;
  type: ChangelogType;
  title: string;
  summary: string;
  body_md: string;
  tags: string[];
  url: string | null;
}
