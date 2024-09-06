import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ReportRequest } from '@/features/record-detail';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Promise<ReportRequest>;
  const data = await fetchData(`/report`, 'POST', body);

  return NextResponse.json(data);
}
