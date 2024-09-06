export interface blockMemberProps {
  status: number;
  code: string;
  message: string;
}

export function useBlockMember() {
  const blockMember = async () => {
    try {
      const response = await fetch('/api/member/black', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to Block');
      }
      return (await response.json()) as blockMemberProps;
    } catch (error) {
      console.error('Block request error:', error);
      throw error;
    }
  };

  return { blockMember };
}
