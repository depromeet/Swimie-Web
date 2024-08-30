'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useMemberFollowingState } from '@/hooks';

import { CheerNotificationProps, FollowNotificationProps } from '../types';
import { NotificationResponse } from './dto';

async function getNotification(cursorCreatedAt: unknown) {
  const cursorCreatedAtQuery = cursorCreatedAt
    ? `?cursorCreatedAt=${cursorCreatedAt as string}`
    : '';
  const res = await fetch(`/api/notification${cursorCreatedAtQuery}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export default function useGetNotification() {
  const { data, isLoading, ...queryInfo } =
    useInfiniteQuery<NotificationResponse>({
      queryKey: ['useGetNotification'],
      queryFn: ({ pageParam = undefined }) => getNotification(pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.cursorCreatedAt : undefined,
    });
  const { hasNextPage, fetchNextPage } = queryInfo;

  const { ref, inView } = useInView({
    rootMargin: '100px 0px 0px 0px',
  });

  useEffect(() => {
    if (inView) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const rawNotificationData =
    data?.pages.map((page) => page.data.notifications).flat() || [];
  const getByFarNotificationData: (
    | CheerNotificationProps
    | FollowNotificationProps
  )[] = rawNotificationData;

  const lastPageCount = data?.pages.length ?? 0;
  const lastMemberIdList = useMemo(
    () =>
      data?.pages[lastPageCount - 1].data?.notifications
        ?.flatMap((notification) =>
          'memberId' in notification ? notification.memberId : null,
        )
        ?.filter((id): id is number => id !== null) ?? [],
    [lastPageCount, data?.pages],
  );

  const { useSyncFollowingListState } = useMemberFollowingState();
  useSyncFollowingListState(lastMemberIdList);

  return { ref, isLoading, getByFarNotificationData };
}
