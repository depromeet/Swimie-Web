'use client';

import { css } from '@/styled-system/css';

import useGetNotification from '../../apis/use-get-notification';
import { FollowNotification, NoNotification } from '../molecules';
import { CheerNotification } from '../molecules/cheer-notification';

export function NotificationList() {
  const { ref, isLoading, getByFarNotificationData } = useGetNotification();
  return (
    <ul className={layoutStyles}>
      {!isLoading && getByFarNotificationData.length === 0 && (
        <NoNotification
          mainText="아직 받은 알림이 없어요"
          subText="공지, 활동 소식이 도착하면 알려드릴게요"
        />
      )}
      {!isLoading &&
        getByFarNotificationData.length > 0 &&
        getByFarNotificationData.map((notification) =>
          'memoryId' in notification ? (
            <CheerNotification
              ref={ref}
              key={notification.notificationId}
              {...notification}
            />
          ) : (
            <FollowNotification
              ref={ref}
              key={notification.notificationId}
              {...notification}
            />
          ),
        )}
    </ul>
  );
}

const layoutStyles = css({
  paddingBottom: '40px',
});
