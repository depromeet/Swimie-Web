'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

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
  });

  const flattenData =
    query.data?.pages.flatMap(({ data }) => data?.contents) ?? [];

  return {
    ...query,
    flattenData,
  };
};
