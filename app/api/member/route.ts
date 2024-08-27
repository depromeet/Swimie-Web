import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { MemberInfo } from '@/features/main';

export interface MemberResponse {
  status: number;
  code: string;
  message: string;
  data: MemberInfo;
}

export async function GET() {
  const data = await fetchData<MemberResponse>('/member', 'GET');

  return NextResponse.json(data);
}
