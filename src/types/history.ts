export type HistoryItemType = 'pdf' | 'download' | 'invoice' | 'activity' | 'view';

export interface HistoryItem {
  id: string;
  type: HistoryItemType;
  title: string;
  description: string;
  createdAt: string; // ISO date string
  metadata?: {
    fileSize?: string;
    amount?: number;
    url?: string;
  };
}
