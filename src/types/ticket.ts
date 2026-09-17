export type TicketStatus = 'Pending' | 'Admin Review' | 'Resolved' | 'Closed';

export interface TicketCategoryType {
  _id: string;
  categoryName: string;
  [key: string]: any;
}

export interface Ticket {
  _id: string;
  userId?: string;
  categoryId: string; // The category string or actual ID
  subject: string;
  description: string;
  remarks?: string;
  status: TicketStatus;
  adminId?: string;
  createdAt: string;
  updatedAt?: string;
}
