import { parse } from 'date-fns';

// Function to parse a date string using multiple possible formats
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

  // Try each format until parsing succeeds
  for (const fmt of formats) {
    const parsed = parse(dateStr, fmt, new Date());
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  // If no format matches, return the current date as fallback
  return new Date();
};
