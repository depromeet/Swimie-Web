import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ImagePresignedResponse } from '@/features/record';
import { DetailCheerItem } from '@/features/record-detail';

type Cheer = {
  memoryId: number;
} & DetailCheerItem;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Promise<Cheer>;
  const data = await fetchData<ImagePresignedResponse>(
    `/reaction`,
    'POST',
    body,
  );

  return NextResponse.json(data);
}
