import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { FollowingSummaryResponse } from '../types';

const getFollowingSummary = async () => {
  const res = await fetch('/api/friend/following/summary', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useFollowingSummary = () => {
  return useQuery<FollowingSummaryResponse>({
    queryKey: ['followingSummary'],
    queryFn: () => getFollowingSummary(),
    placeholderData: keepPreviousData,
  });
};
