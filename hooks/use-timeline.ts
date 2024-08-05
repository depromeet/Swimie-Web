import { useInfiniteQuery } from '@tanstack/react-query';

import { TimeLineResponse } from '@/features/main/time-line';

const getTimeLineData = async (cursorRecordAt: unknown) => {
  const queryString = cursorRecordAt
    ? `?cursorRecordAt=${cursorRecordAt as string}`
    : '';
  const res = await fetch(`/api/memory/timeline${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useTimeLineData = () => {
  return useInfiniteQuery<TimeLineResponse>({
    queryKey: ['timelineData'],
    queryFn: ({ pageParam = undefined }) => getTimeLineData(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.cursorRecordAt : undefined,
  });
};
