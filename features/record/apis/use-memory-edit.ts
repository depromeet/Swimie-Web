import { useMutation } from '@tanstack/react-query';

import { MemoryPullResponse, RecordRequestProps } from './dto';

async function memoryEdit(
  formData: RecordRequestProps,
): Promise<MemoryPullResponse> {
  const res = await fetch(
    `/api/memory/edit
    `,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useMemoryEdit() {
  return useMutation({
    mutationFn: memoryEdit,
  });
}
