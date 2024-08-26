export interface NotificationElementProps {
  type: 'CHEER' | 'FOLLOW' | 'FRIEND';
  notificationId: number;
  nickname: string;
  profileImageUrl?: string;
  memberId?: number;
  content?: string;
  createdAt: string;
  hasRead: boolean;
}

export interface NotificationResponse {
  status: number;
  code: string;
  message: string;
  data: {
    notifications: NotificationElementProps[];
    cursorCreatedAt: string;
    hasNext: boolean;
  };
}
