import { NextResponse } from 'next/server';

import { axiosInstance } from '@/apis/axios-instance';

interface PoolSearchResponse {
  data: unknown;
}

export async function GET() {
  try {
    const res = await axiosInstance.get<PoolSearchResponse>(
      `/api/pool/search?nameQuery=%EA%B0%95%EB%82%A8&cursorId=77`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = res.data;

    console.log(data.data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
