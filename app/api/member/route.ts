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
  try {
    const data = await fetchData<MemberProps>('/member', 'GET');

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching member data:', error);

    return NextResponse.error();
  }
}
