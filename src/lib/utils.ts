import { type ClassValue, clsx } from 'clsx'
import { format, parse } from 'date-fns';
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateForSubmission = (date: string) =>
  format(parse(date, 'dd.MM.yyyy', new Date()), "yyyy-MM-dd'T00:00:00.000Z'");

export const parseDisplayDate = (date: string) =>
  parse(date, 'dd.MM.yyyy', new Date());

export const formatLicensePlate = (value: string) => {
  // Remove all non-alphanumeric characters and limit to 7 characters
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);

  // Apply the format "77-RH-987"
  const formatted = cleaned.replace(/^(\d{2})([A-Z]{2})?(\d{0,3})?$/, (_, p1, p2, p3) => {
    return [p1, p2, p3].filter(Boolean).join("-");
  });

  return formatted;
};