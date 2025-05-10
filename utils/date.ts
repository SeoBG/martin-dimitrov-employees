import { parse } from 'date-fns';

export const parseDate = (dateStr: string): Date => {
  const formats = [
    'yyyy-MM-dd',
    'MM/dd/yyyy',
    'dd-MM-yyyy',
    'yyyy/MM/dd',
    'MM.dd.yyyy',
    'dd/MM/yyyy',
    'yyyy.MM.dd'
  ];

  for (const fmt of formats) {
    const parsed = parse(dateStr, fmt, new Date());
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return new Date();
};
