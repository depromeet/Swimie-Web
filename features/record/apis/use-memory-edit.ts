import { useMutation } from '@tanstack/react-query';

import { revalidateRecordDetail } from '../server-actions';
import { MemoryPullResponse, SubmitRecordRequestProps } from './dto';

async function memoryEdit(data: {
  formData: SubmitRecordRequestProps;
  memoryId: number;
}): Promise<MemoryPullResponse> {
  const res = await fetch(
    `/api/memory/edit/${data.memoryId}
    `,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.formData),
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useMemoryEdit(memoryId: string) {
  return useMutation({
    mutationFn: memoryEdit,
    onSuccess: () => {
      revalidateRecordDetail(memoryId);
    },
  });
}
