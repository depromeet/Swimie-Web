import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/pool/search?nameQuery=${searchParams.get('nameQuery')}`,
    {
      headers: {
        'Content-Type': 'application/json',
        // 임시 토큰
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkcG0xNTJiZSIsInN1YiI6IjEiLCJyb2xlIjoiVVNFUiIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjE3OTQzNjAsImV4cCI6MjA4MTc5NDM2MH0.ap7EqA9z-wzd-zGwCxGMHd68EFalGYaujZqdRThifg6Pkw_i9j6z1djEvHUwZdveATBFBh_vns2zfs3imD6uAA',
      },
      cache: 'no-store',
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await res.json();
  return NextResponse.json(data);
}
