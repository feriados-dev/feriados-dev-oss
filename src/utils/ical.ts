import { Holiday } from '@/types';

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function formatDate(date: Date): string {
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function nextDay(date: Date): string {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + 1);
  return formatDate(d);
}

export function generateIcal(holidays: Holiday[], calName: string, prodId: string): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${prodId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(calName)}`,
    'X-WR-TIMEZONE:America/Sao_Paulo',
  ];

  for (const holiday of holidays) {
    const dtstart = formatDate(holiday.date);
    const dtend = nextDay(holiday.date);
    const uid = `${dtstart}-${holiday.id}@api.feriados.dev`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `SUMMARY:${escapeText(holiday.name)}`,
      ...(holiday.description ? [`DESCRIPTION:${escapeText(holiday.description)}`] : []),
      `CATEGORIES:${escapeText(holiday.type)}`,
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
}
