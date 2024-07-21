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
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkcG0xNTJiZSIsInN1YiI6IjEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyMTM2OTU2MCwiZXhwIjoxNzMzNDY1NTYwfQ.uiRq1PkjCl4ZdZjwFkzdnl1L_C4jSnGAFpbFkokjeK1NMjM4DjA01K7VFu0fCACftfHUX8kVppzjXyKIX1p2QA',
      },
      cache: 'no-store',
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await res.json();
  return NextResponse.json(data);
}
