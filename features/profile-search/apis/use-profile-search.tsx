'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMemberFollowingState } from '@/hooks';

import { ProfileSearch } from '../types';

const fetchProfile = async (nameQuery: string, cursorId?: number) => {
  const res = await fetch(
    `/api/member/search?nameQuery=${nameQuery}&cursorId=${cursorId ?? ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.json();
};

export const useProfileSearch = (nameQuery: string) => {
  const query = useInfiniteQuery<ProfileSearch>({
    queryKey: ['useProfileSearch', nameQuery],
    queryFn: ({ pageParam }) => fetchProfile(nameQuery, pageParam as number),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage?.data?.cursorId : undefined,
    enabled: !!nameQuery?.length,
  });

  const flattenData =
    query.data?.pages.flatMap(({ data }) => data?.memberInfoResponses ?? []) ??
    [];

  const lastPageCount = query.data?.pages.length ?? 0;
  const lastMemberIdList = useMemo(
    () =>
      query.data?.pages[lastPageCount - 1].data?.memberInfoResponses?.flatMap(
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
