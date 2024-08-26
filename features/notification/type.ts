export interface NotificationElementProps {
  id: number;
  variant: 'follow' | 'cheer';
  userName: string;
  time: string;
  isFollowing?: boolean;
  description?: string;
  recordDate?: string;
  isClicked: boolean;
}
