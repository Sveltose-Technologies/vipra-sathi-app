export interface PanchangDetails {
  date: string;
  location: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: string;
  paksha: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  rahuKaal: string;
  yamaganda: string;
  gulikaKaal: string;
  abhijitMuhurat: string;
  choghadiya: string;
  festivals: string[];
}

export const generateMockPanchang = (dateObj: Date): PanchangDetails => {
  const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  return {
    date: dateStr,
    location: 'New Delhi, India',
    sunrise: '05:42 AM',
    sunset: '07:11 PM',
    moonrise: '08:15 PM',
    moonset: '07:30 AM',
    tithi: 'Ekadashi (up to 04:30 PM)',
    paksha: 'Shukla Paksha',
    nakshatra: 'Rohini (up to 08:45 PM)',
    yoga: 'Vaidhriti',
    karana: 'Vanija',
    rahuKaal: '04:30 PM - 06:00 PM',
    yamaganda: '12:00 PM - 01:30 PM',
    gulikaKaal: '10:30 AM - 12:00 PM',
    abhijitMuhurat: '11:45 AM - 12:35 PM',
    choghadiya: 'Shubh (06:00 AM - 07:30 AM), Labh (12:00 PM - 01:30 PM)',
    festivals: dateObj.getDate() % 5 === 0 ? ['Devshayani Ekadashi', 'Tulsi Vivah Beginning'] : [],
  };
};
