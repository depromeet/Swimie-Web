import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { Cheer } from '@/features/record-detail/apis';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Promise<Cheer>;
  const data = await fetchData<{
    status: number;
    code: 'REACTION_1' | 'REACTION_2';
    message: string;
  }>(`/memory/reaction`, 'POST', body);

  return NextResponse.json(data);
}
