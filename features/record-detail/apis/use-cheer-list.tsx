'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { DetailCheerPreview } from '../types';

const fetchCheerList = async (memoryId: number, cursorId?: number) => {
  const res = await fetch(
    `/api/memory/${memoryId}/reactions/detail${cursorId ?? `?cursorId=${cursorId}`}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.json();
};

export const useCheerList = (memoryId: number) => {
  const query = useInfiniteQuery<{
    data: {
      totalCount: number;
      cursorId: number;
      hasNext: boolean;
    } & DetailCheerPreview;
  }>({
    queryKey: ['useCheerList', memoryId],
    queryFn: ({ pageParam }) => fetchCheerList(memoryId, pageParam as number),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.cursorId : undefined,
    enabled: !!memoryId,
  });

  const flattenData =
    query.data?.pages.flatMap(({ data }) => data?.reactions) ?? [];

  return {
    ...query,
    flattenData,
    totalCount: query.data?.pages?.[0].data.totalCount,
  };
};
