'use client';

import { useQuery } from '@tanstack/react-query';

import { SearchPoolInitialResultResponse } from './dto';

async function searchPoolInitial() {
  const res = await fetch(`/api/pool/search/initial`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export function useSearchPoolInitial(nameQuery: string) {
  return useQuery<SearchPoolInitialResultResponse>({
    queryKey: ['useSearchPoolInitial'],
    queryFn: searchPoolInitial,
    retry: 1,
    enabled: !nameQuery,
  });
}
