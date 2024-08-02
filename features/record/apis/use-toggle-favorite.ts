import { useMutation, useQueryClient } from '@tanstack/react-query';

async function toggleFavorite(poolId: number) {
  const res = await fetch(`/api/pool/favorite`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ poolId }),
  });

  return res.json();
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({
        queryKey: ['useSearchPoolInitial'],
      });
    },
  });
}
