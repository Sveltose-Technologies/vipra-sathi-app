import { CalendarEvent } from '../types/calendar';

const getFormattedDate = (daysOffset: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const DUMMY_YAJMANS = [
  { name: 'Sharma Ji', phone: '+91 98765 43210' },
  { name: 'Verma Family', phone: '+91 91234 56789' },
  { name: 'Gupta Ji', phone: '+91 99887 76655' },
  { name: 'Patel Family', phone: '+91 87654 32109' },
  { name: 'Tripathi Ji', phone: '+91 76543 21098' },
];

export const generateMockCalendarEvents = (): CalendarEvent[] => {
  return [
    {
      id: 'e1',
      title: 'Ganesh Chaturthi Pooja',
      date: getFormattedDate(2),
      time: '09:00 AM',
      type: 'festival',
      status: 'festival',
      description: 'Major festival booking at Main Temple.',
      yajmanName: 'Sharma Ji',
      yajmanPhone: '+91 98765 43210',
    },
    {
      id: 'e2',
      title: 'Vastu Shanti',
      date: getFormattedDate(4),
      time: '11:30 AM',
      type: 'pooja',
      status: 'upcoming',
      description: 'New home warming ceremony for Sharma Family.',
      yajmanName: 'Verma Family',
      yajmanPhone: '+91 91234 56789',
    },
    {
      id: 'e3',
      title: 'Prepare Samagri List',
      date: getFormattedDate(1),
      time: '04:00 PM',
      type: 'task',
      status: 'upcoming',
    },
    {
      id: 'e4',
      title: 'Satyanarayan Katha',
      date: getFormattedDate(-2),
      time: '06:00 PM',
      type: 'pooja',
      status: 'done',
      yajmanName: 'Gupta Ji',
      yajmanPhone: '+91 99887 76655',
    },
    {
      id: 'e5',
      title: 'Client Meeting',
      date: getFormattedDate(-1),
      time: '10:00 AM',
      type: 'task',
      status: 'cancelled',
      description: 'Client requested reschedule.',
      yajmanName: 'Patel Family',
    }
  ];
};
