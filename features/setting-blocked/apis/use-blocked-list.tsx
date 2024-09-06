'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { BlockedList } from '../types';

const fetchProfile = async (cursorId?: number) => {
  const res = await fetch(`/api/member/black?&cursorId=${cursorId ?? ''}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useBlockedList = () => {
  const query = useInfiniteQuery<BlockedList>({
    queryKey: ['useBlockedList'],
    queryFn: ({ pageParam }) => fetchProfile(pageParam as number),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage?.data?.cursorId : undefined,
  });

  const flattenData =
    query.data?.pages.flatMap(({ data }) => data?.blackMembers ?? []) ?? [];

  return {
    ...query,
    flattenData,
  };
};
