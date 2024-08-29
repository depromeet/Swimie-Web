import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export interface withdrawalProps {
  status: number;
  code: string;
  message: string;
  data: object;
}

export async function POST(request: NextRequest) {
  const withdrawalData = (await request.json()) as withdrawalProps;
  const data = await fetchData('/withdrawal', 'POST', withdrawalData);

  return NextResponse.json(data);
}
