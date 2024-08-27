export type NotificationType = 'CHEER' | 'FOLLOW' | 'FRIEND';

export interface NotificationElementProps {
  type: NotificationType;
  notificationId: number;
  nickname: string;
  profileImageUrl?: string;
  memberId?: number;
  memoryId?: number;
  content?: string;
  createdAt: string;
  recordCreatedAt?: string;
  hasRead: boolean;
}
