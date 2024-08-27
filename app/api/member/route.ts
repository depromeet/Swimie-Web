import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export interface MemberProps {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    nickname: string;
    goal: number;
    profileImageUrl: string;
  };
}

export async function GET() {
  const data = await fetchData<MemberProps>('/member', 'GET');

  return NextResponse.json(data);
}
