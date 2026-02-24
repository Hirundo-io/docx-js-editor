import type { ReviewRevisionType } from '../types';

export function revisionTypeLabel(type: ReviewRevisionType): string {
  switch (type) {
    case 'insertion':
      return 'Insertion';
    case 'deletion':
      return 'Deletion';
    case 'moveFrom':
      return 'Move From';
    case 'moveTo':
      return 'Move To';
    case 'formatChange':
      return 'Formatting';
  }
}

export function formatRevisionDate(date: string | null): string {
  if (!date) return 'Unknown date';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleString();
}
