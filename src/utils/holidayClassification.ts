import { Holiday } from '@/types';

export function blocksBusinessDay(holiday: Holiday): boolean {
  if (holiday.type !== 'optional') return true;

  const normalizedName = holiday.name.toLocaleLowerCase('pt-BR');
  return normalizedName === 'carnaval' || normalizedName === 'corpus christi';
}
