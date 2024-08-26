import { css } from '@/styled-system/css';

import { NotificationElementProps } from '../../type';
import { NotificationElement } from '../molecules';

interface NotificationListProps {
  alarms: NotificationElementProps[];
}

export function NotificationList({ alarms }: NotificationListProps) {
  return (
    <ul className={layoutStyles}>
      {alarms.map((alarm) => (
        <NotificationElement key={alarm.id} {...alarm} />
      ))}
    </ul>
  );
}

const layoutStyles = css({
  paddingBottom: '40px',
});
