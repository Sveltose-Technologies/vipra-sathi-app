export type YajmanCategory = 'Astrology' | 'Karmkand' | 'Vaastu' | 'Hastrekha' | 'Others';

export interface Yajman {
  id: string;
  name: string;
  email?: string;
  callingMobile: string;
  whatsappMobile?: string;
  birthday?: string; // ISO Date string YYYY-MM-DD
  anniversary?: string; // ISO Date string YYYY-MM-DD
  yearlyProgramDate?: string; // ISO Date string YYYY-MM-DD
  yearlyProgramName?: string; // e.g. "Yearly Shraddha / Tithi"
  city?: string;
  state?: string;
  address?: string;
  category: YajmanCategory;
  kycDate: string; // ISO Date string YYYY-MM-DD
  remark?: string;
  createdAt: number;
  updatedAt: number;
}
