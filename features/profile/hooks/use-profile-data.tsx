import { useQuery } from '@tanstack/react-query';

import { ProfileProps } from '@/features/profile';

import { fetchProfileData } from '../apis/fetch-profile-data';

export const useProfileData = (id?: number) => {
  return useQuery<ProfileProps['data']>({
    queryKey: ['profileData', String(id)],
    queryFn: () =>
      fetchProfileData(Number(id)).then((data) => {
        return data.data;
      }),
    enabled: !!id,
    // staleTime: Infinity,
  });
};
