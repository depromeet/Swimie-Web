'use client';

import { Virtuoso } from 'react-virtuoso';

import { LoadingArea } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { useGetNotification } from '../../apis';
import { FollowNotification, NoNotification } from '../molecules';
import { CheerNotification } from '../molecules/cheer-notification';
import { NotificationListSkeleton } from './notification-list-skeleton';

export function NotificationList() {
  const {
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    getByFarNotificationData,
  } = useGetNotification();

  const handleRangeChanged = (range: { endIndex: number }) => {
    const currentContentsLastIndex = getByFarNotificationData.length - 1;
    if (range.endIndex >= currentContentsLastIndex - 2) {
      void fetchNextPage();
    }
  };

  if (isLoading) return <NotificationListSkeleton />;
  return (
    <ol className={layoutStyles}>
      {getByFarNotificationData.length === 0 && (
        <NoNotification
          mainText="아직 받은 알림이 없어요"
          subText="공지, 활동 소식이 도착하면 알려드릴게요"
        />
      )}
      {getByFarNotificationData.length > 0 && (
        <Virtuoso
          data={getByFarNotificationData}
          overscan={200}
          useWindowScroll
          rangeChanged={handleRangeChanged}
          itemContent={(_, notification) =>
            'memoryId' in notification ? (
              <CheerNotification
                key={notification.notificationId}
                {...notification}
              />
            ) : (
              <FollowNotification
                key={notification.notificationId}
                {...notification}
              />
            )
          }
          components={{
            Footer: () =>
              isFetchingNextPage ? (
                <LoadingArea width={30} height={30} />
              ) : (
                <></>
              ),
          }}
        />
      )}
    </ol>
  );
}

const layoutStyles = css({
  paddingBottom: '40px',
});
