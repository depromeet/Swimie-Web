import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function GET() {
  try {
    const data = await fetchData(`/logout`, 'GET');
    cookies().delete('accessToken');
    cookies().delete('refreshToken');

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in DELETE request:', error);
    return NextResponse.error();
  }
}
