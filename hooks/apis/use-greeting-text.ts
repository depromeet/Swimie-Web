import { useQuery } from '@tanstack/react-query';

import { Response } from '@/apis';

export const getGreetingText = async () => {
  const res = await fetch(`/api/greeting`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useGreetingText = () => {
  return useQuery<Response<{ message: string }>>({
    queryKey: ['greetingText'],
    queryFn: () => getGreetingText(),
  });
};
