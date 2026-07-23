import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 7) {
    return `${cleaned.slice(0, 3)}-****-${cleaned.slice(-4)}`;
  }
  return '***-****-****';
}

export async function hashPhone(phone: string): Promise<string> {
  const cleaned = phone.replace(/\D/g, '');
  const encoder = new TextEncoder();
  const data = encoder.encode(cleaned);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function getPhoneLast4(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.slice(-4);
}

export function getPhoneFirst3(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.slice(0, 3);
}
