'use client';

import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      await response.json();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return logout;
}
