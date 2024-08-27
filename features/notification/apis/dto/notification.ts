import { Response } from '@/apis';

export interface NotificationElementProps {
  type: 'CHEER' | 'FOLLOW' | 'FRIEND';
  notificationId: number;
  nickname: string;
  profileImageUrl?: string;
  memberId?: number;
  content?: string;
  createdAt: string;
  recordCreatedAt?: string;
  hasRead: boolean;
}

export type NotificationResponse = Response<{
  notifications: NotificationElementProps[];
  cursorCreatedAt: string;
  hasNext: boolean;
}>;
