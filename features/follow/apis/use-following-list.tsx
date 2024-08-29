'use client';

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMemberFollowingState } from '@/hooks';

import { ProfileFollow } from '../types';

const fetchFollowingList = async (memberId: number, cursorId?: number) => {
  const res = await fetch(
    `/api/friend/${memberId}/following${cursorId ? `?cursorId=${cursorId}` : ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.json();
};

export const useFollowingList = (memberId: number) => {
  const query = useInfiniteQuery<ProfileFollow>({
    queryKey: ['useFollowingList', memberId],
    queryFn: ({ pageParam }) =>
      fetchFollowingList(memberId, pageParam as number),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage?.data?.cursorId : undefined,
    enabled: !!memberId,
    placeholderData: keepPreviousData,
  });

  const flattenData =
    query.data?.pages.flatMap(({ data }) => data?.contents ?? []) ?? [];

  const lastPageCount = query.data?.pages.length ?? 0;
  const lastMemberIdList = useMemo(
    () =>
      query.data?.pages[lastPageCount - 1].data?.contents?.flatMap(
        ({ memberId }) => memberId,
      ) ?? [],
    [lastPageCount, query.data?.pages],
  );

  const { useSyncFollowingListState } = useMemberFollowingState();
  useSyncFollowingListState(lastMemberIdList);

  return {
    ...query,
    flattenData,
  };
};
