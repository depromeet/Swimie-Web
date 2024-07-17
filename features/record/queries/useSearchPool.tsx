import { useQuery } from '@tanstack/react-query';

import { SearchPoolResultResponse } from './dto';

async function getSearchPool(nameQuery: string) {
  const res = await fetch(`백엔드 api 엔드포인트?${nameQuery}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export default function useSearchPool(nameQuery: string) {
  return useQuery<SearchPoolResultResponse>({
    queryKey: ['useSearchPool', nameQuery],
    queryFn: () => getSearchPool(nameQuery),
  });
}
