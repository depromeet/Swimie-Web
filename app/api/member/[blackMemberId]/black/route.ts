import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function DELETE(
  _: NextRequest,
  { params }: { params: { blackMemberId: number } },
) {
  const data = await fetchData<{
    status: number;
    code: 'BLACK_2';
    message: string;
  }>(`/member/${params.blackMemberId}/black`, 'DELETE');

  return NextResponse.json(data);
}
