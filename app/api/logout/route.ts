import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function GET() {
  const cookieStore = cookies();
  try {
    const data = await fetchData(`/logout`, 'GET');
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in DELETE request:', error);
    return NextResponse.error();
  }
}
