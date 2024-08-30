import { WithdrawalRequestData } from '../types';

export async function usePostWithdrawal(data: WithdrawalRequestData) {
  const response = await fetch('/api/withdrawal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Withdrawal request failed');
  }

  return response.json();
}
