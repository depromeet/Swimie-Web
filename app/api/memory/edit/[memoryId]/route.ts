import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { SubmitRecordRequestProps } from '@/features/record';
import { MemoryPullResponse } from '@/features/record/apis/dto/memory';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { memoryId: number } },
) {
  const body = (await request.json()) as Promise<SubmitRecordRequestProps>;
  const data = await fetchData<MemoryPullResponse>(
    `/memory/${Number(params.memoryId)}`,
    'PATCH',
    body,
  );

  return NextResponse.json(data);
}
