'use client';

import Link from 'next/link';

import { BellIcon } from '@/components/atoms';
import { useCountNotification } from '@/features/notification';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export function NotificationButton() {
  return (
    <Link href="/notification" className={linkLayoutStyles}>
      <BellIcon />
      <NotificationCount />
    </Link>
  );
}

function NotificationCount() {
  const { data } = useCountNotification();
  if (!data?.data.totalCount) return null;
  return (
    <div className={notificationCountStyles}>
      {data?.data.totalCount >= 100 ? '99+' : data?.data.totalCount}
    </div>
  );
}

const linkLayoutStyles = css({
  position: 'relative',
});

const notificationCountStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '-6px',
  left: '12px',
  padding: '0 5.5px',
  marginLeft: 'auto',
  width: 'fit-content',
  height: '16px',
  backgroundColor: '#EC6344',
  textStyle: 'caption2',
  color: 'background.white',
  borderRadius: '21px',
});
