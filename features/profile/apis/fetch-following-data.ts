import { FollowingProps } from '@/features/profile';

export async function fetchFollowingData(id: number): Promise<FollowingProps> {
  const response = await fetch(`/api/friend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ friends: [id] }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch friend data');
  }

  return (await response.json()) as FollowingProps;
}
