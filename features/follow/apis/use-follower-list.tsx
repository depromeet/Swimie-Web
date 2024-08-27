'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { ProfileFollow } from '../types';

const fetchFollowerList = async (memberId: number, cursorId?: number) => {
  const res = await fetch(
    `/api/friend/${memberId}/follower${cursorId ? `?cursorId=${cursorId}` : ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.json();
};

export const useFollowerList = (memberId: number) => {
  const query = useInfiniteQuery<ProfileFollow>({
    queryKey: ['useFollowerList', memberId],
    queryFn: ({ pageParam }) =>
      fetchFollowerList(memberId, pageParam as number),
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
