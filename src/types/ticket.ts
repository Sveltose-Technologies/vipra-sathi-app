export type TicketCategory = 'Suggestions' | 'Content Issues' | 'Technical Issues' | 'Payment Issues' | 'Other Queries';
export type TicketStatus = 'Pending' | 'Admin Review' | 'Resolved' | 'Closed';

export interface Ticket {
  id: string;
  category: TicketCategory;
  subject: string;
  description: string;
  remarks?: string;
  status: TicketStatus;
  createdAt: string;
}
