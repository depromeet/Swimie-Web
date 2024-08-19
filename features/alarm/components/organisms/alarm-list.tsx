import { css } from '@/styled-system/css';

import { AlarmElementProps } from '../../type';
import { AlarmElement } from '../molecules';

interface AlarmListProps {
  alarms: AlarmElementProps[];
}

export function AlarmList({ alarms }: AlarmListProps) {
  return (
    <ul className={layoutStyles}>
      {alarms.map((alarm) => (
        <AlarmElement key={alarm.id} {...alarm} />
      ))}
    </ul>
  );
}

const layoutStyles = css({
  padding: '0 20px 40px 20px',
});
