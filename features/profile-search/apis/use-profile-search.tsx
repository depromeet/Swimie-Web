'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

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

  return {
    ...query,
    flattenData,
  };
};
