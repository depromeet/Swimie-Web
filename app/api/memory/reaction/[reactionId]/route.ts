import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { reactionId: number } },
) {
  const data = await fetchData<{
    status: number;
    code: 'REACTION_4';
    message: string;
  }>(`/memory/reaction/${params.reactionId}`, 'DELETE');

  return NextResponse.json(data);
}
