import { useQuery } from '@tanstack/react-query';

import { SearchPoolInitialResultResponse } from './dto';

async function getSearchPoolInitial() {
  const res = await fetch(`/api/pool/search/initial`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export default function useSearchPoolInitial(nameQuery: string) {
  return useQuery<SearchPoolInitialResultResponse>({
    queryKey: ['useSearchPoolInitial'],
    queryFn: () => getSearchPoolInitial(),
    enabled: !nameQuery,
  });
}
