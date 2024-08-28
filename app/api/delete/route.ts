import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function DELETE() {
  const data = await fetchData(`/auth/delete`, 'DELETE');

  return NextResponse.json(data);
}
