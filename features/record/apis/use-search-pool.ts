'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { PoolProps, SearchPoolResultResponse } from './dto';

async function searchPool(nameQuery: string, cursorId: unknown) {
  const cursorIdQuery = cursorId ? `&cursorId=${cursorId as number}` : '';
  const res = await fetch(
    `/api/pool/search?nameQuery=${nameQuery}${cursorIdQuery}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.json();
}

export default function useSearchPool(nameQuery: string) {
  const { data, ...queryInfo } = useInfiniteQuery<SearchPoolResultResponse>({
    queryKey: ['getSearchMovie', nameQuery],
    queryFn: ({ pageParam = undefined }) => searchPool(nameQuery, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.cursorId : undefined,
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

  const rawPoolData =
    data?.pages.map((page) => page.data.poolInfos).flat() || [];
  const getByFarPoolData: PoolProps[] = rawPoolData;

  return { ref, getByFarPoolData };
}
