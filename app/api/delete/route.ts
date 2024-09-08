import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { MemoryDeleteResponse } from '@/features/record';

export async function DELETE() {
  const data = await fetchData<MemoryDeleteResponse>(`/auth/delete`, 'DELETE');

  return NextResponse.json(data);
}
