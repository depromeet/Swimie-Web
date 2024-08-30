export type NotificationType = 'CHEER' | 'FOLLOW' | 'FRIEND';

interface NotificationProps {
  type: NotificationType;
  notificationId: number;
  nickname: string;
  hasRead: boolean;
  createdAt: string;
}

export interface CheerNotificationProps extends NotificationProps {
  memoryId: number;
  content: string;
  recordCreatedAt: string;
}

export interface FollowNotificationProps extends NotificationProps {
  profileImageUrl: string;
  memberId: number;
  isFollow: boolean;
}
