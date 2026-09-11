export type NotificationType = 'festival' | 'panchang' | 'subscription' | 'community' | 'update';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string; // ISO date string
  isRead: boolean;
}
