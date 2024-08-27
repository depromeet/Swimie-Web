import { useInfiniteQuery } from '@tanstack/react-query';

import { NewsResponse } from '../types';

const getNewsData = async (cursorId: unknown) => {
  const queryString = cursorId ? `?cursorId=${cursorId as string}` : '';
  const res = await fetch(`/api/news${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useNewsData = () => {
  return useInfiniteQuery<NewsResponse>({
    queryKey: ['newsData'],
    queryFn: ({ pageParam = undefined }) => getNewsData(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.cursorId : undefined,
  });
};
