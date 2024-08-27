import { useQueryClient } from '@tanstack/react-query';

import { MemberResponse } from '@/app/api/member/route';

export const useGoal = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<MemberResponse>(['currentMember']);
  const goal = data?.data.goal;

  return goal;
};
