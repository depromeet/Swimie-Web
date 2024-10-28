import { NextResponse } from 'next/server';

import { Response } from '@/apis';
import { fetchData } from '@/apis/fetch-data';

export async function GET() {
  const data = await fetchData<Response<{ message: string }>>(
    '/greeting',
    'GET',
  );

  return NextResponse.json(data);
}
