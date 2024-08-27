import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { MemberResponse } from '@/app/api/member/route';

export const getCurrentMemberInfo = async () => {
  const res = await fetch(`/api/member`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useCurrentMemberInfo = () => {
  return useQuery<MemberResponse>({
    queryKey: ['currentMember'],
    queryFn: () => getCurrentMemberInfo(),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
};
