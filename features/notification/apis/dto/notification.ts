import { Response } from '@/apis';

import { CheerNotificationProps, FollowNotificationProps } from '../../types';

export type NotificationResponse = Response<{
  notifications: (CheerNotificationProps | FollowNotificationProps)[];
  cursorCreatedAt: string;
  hasNext: boolean;
}>;

export type NotificationReadResponse = Response<object>;

export type NotificationCountResponse = Response<{ totalCount: number }>;
