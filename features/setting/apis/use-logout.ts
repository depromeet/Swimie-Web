'use client';

export function useLogout() {
  const logout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      await response.json();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return logout;
}
