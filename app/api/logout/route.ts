import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function GET() {
  const data = await fetchData(`/logout`, 'GET');
  cookies().delete('accessToken');
  cookies().delete('refreshToken');

  return NextResponse.json(data);
}
