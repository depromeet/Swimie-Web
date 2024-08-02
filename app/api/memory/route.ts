import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { RecordRequestProps } from '@/features/record';
import { MemoryResponse } from '@/features/record/apis/dto/memory';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Promise<RecordRequestProps>;
  const data = await fetchData<MemoryResponse>(`/memory`, 'POST', body);

  return NextResponse.json(data);
}
