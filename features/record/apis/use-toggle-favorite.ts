import { useMutation } from '@tanstack/react-query';

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
  return useMutation({
    mutationFn: toggleFavorite,
  });
}
