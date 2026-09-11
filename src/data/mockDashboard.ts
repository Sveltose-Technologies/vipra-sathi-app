export interface AajKaKaam {
  id: string;
  time: string;
  poojaName: string;
  yajmanName: string;
  address: string;
  phone: string;
  samagriList: string[];
  dakshinaStatus: 'Pending' | 'Paid' | 'Partial';
  dakshinaAmount: string;
  notes: string;
}

export const MOCK_AAJ_KA_KAAM: AajKaKaam = {
  id: 'b1',
  time: '10:30 AM',
  poojaName: 'Griha Pravesh',
  yajmanName: 'Sharma Ji',
  address: 'B-402, Sunshine Apts, Andheri West',
  phone: '+919876543210',
  samagriList: ['Kalash', 'Nariyal', 'Kumkum', 'Haldi', 'Mango Leaves'],
  dakshinaStatus: 'Pending',
  dakshinaAmount: '₹5100',
  notes: 'Bring extra Kapoor for Aarti. Yajman requested a short sankalp.'
};

export const MOCK_MORNING_PANCHANG = {
  tithi: 'Shukla Chaturthi',
  sunrise: '06:14 AM',
  sunset: '06:32 PM',
  moonrise: '09:45 AM',
  moonset: '09:12 PM',
  rahuKaal: '15:00 - 16:30',
  gulikaKaal: '12:00 - 13:30',
  festivals: ['Ganesh Chaturthi'],
  vrat: ['Vinayaka Chaturthi Vrat'],
  holidays: ['Public Holiday (MH)']
};
