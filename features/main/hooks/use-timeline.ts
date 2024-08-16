import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { AuthInfoAtom } from '@/store/auth';

import { TimeLineResponse } from '..';

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
  const { nickname } = useAtomValue(AuthInfoAtom);
  return useInfiniteQuery<TimeLineResponse>({
    queryKey: ['timelineData', nickname],
    queryFn: ({ pageParam = undefined }) => getTimeLineData(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.cursorRecordAt : undefined,
  });
};
