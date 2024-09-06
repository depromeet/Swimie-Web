import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { memoryId: number } },
) {
  const data = await fetchData(`/memory/${params.memoryId}`, 'DELETE');

  return NextResponse.json(data);
}
