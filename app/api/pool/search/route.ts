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
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkcG0xNTJiZSIsInN1YiI6IjEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyMTI4OTM1NiwiZXhwIjoxNzIxMjkyOTU2fQ.j24CIOM8ByGYVE0wmvCf8Pd7HEfvNW9k3KuF53TVxVhlJPwLVItE1c2CjOrVnZJ8gK55fCjVqdV3WDC2v11aeQ',
      },
      cache: 'no-store',
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await res.json();
  console.log(data);
  return NextResponse.json(data);
}
