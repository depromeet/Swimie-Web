import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export type goalProps = {
  goal: number;
};

export async function PATCH(request: NextRequest) {
  try {
    const { goal } = (await request.json()) as goalProps;
    const data = await fetchData(`/goal`, 'PATCH', { goal });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update goal' },
      { status: 500 },
    );
  }
}
