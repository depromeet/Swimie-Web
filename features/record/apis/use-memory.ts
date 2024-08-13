import { useMutation } from '@tanstack/react-query';

import { MemoryResponse, SubmitRecordRequestProps } from './dto';

async function memory(
  formData: SubmitRecordRequestProps,
): Promise<MemoryResponse> {
  const res = await fetch(`/api/memory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useMemory() {
  return useMutation({
    mutationFn: memory,
  });
}
