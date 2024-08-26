import { useQuery } from '@tanstack/react-query';

export interface MemberProps {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    nickname: string;
    goal: number;
    profileImageUrl: string;
  };
}

export function useMemberData() {
  return useQuery<MemberProps>({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await fetch(`/api/member`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      return (await response.json()) as MemberProps;
    },
  });
}
