export async function useDeleteAccount() {
  const response = await fetch('/api/delete', {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Delete account request failed');
  }

  return response.json();
}
