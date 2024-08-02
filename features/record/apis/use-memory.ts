import { useMutation } from '@tanstack/react-query';

import { ImagePresignedResponse, RecordRequestProps } from './dto';

async function memory(
  formData: RecordRequestProps,
): Promise<ImagePresignedResponse> {
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
