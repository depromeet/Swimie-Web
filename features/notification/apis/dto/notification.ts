import { Response } from '@/apis';

import { NotificationElementProps } from '../../types';

export type NotificationResponse = Response<{
  notifications: NotificationElementProps[];
  cursorCreatedAt: string;
  hasNext: boolean;
}>;

export type NotificationReadResponse = Response<object>;
