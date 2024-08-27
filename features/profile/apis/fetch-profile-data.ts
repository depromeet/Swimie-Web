import { ProfileProps } from '@/features/profile';

export async function fetchProfileData(id: number): Promise<ProfileProps> {
  const response = await fetch(`/api/profile/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }
  return (await response.json()) as ProfileProps;
}
