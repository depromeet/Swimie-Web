import { useQuery } from '@tanstack/react-query';

import { FollowingProps } from '@/features/profile';

import { fetchFollowingData } from '../apis/fetch-following-data';

export const useFollowingData = (id: number) => {
  return useQuery<FollowingProps['data']>({
    queryKey: ['followingStatus', id],
    queryFn: () =>
      fetchFollowingData(id).then((data) => {
        return data.data;
      }),
    enabled: !!id,
  });
};
