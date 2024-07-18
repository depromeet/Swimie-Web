import { useQuery } from '@tanstack/react-query';

import { SearchPoolResultResponse } from './dto';

async function getSearchPool(nameQuery: string) {
  const res = await fetch(`/api/pool/search?nameQuery=${nameQuery}`, {
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
