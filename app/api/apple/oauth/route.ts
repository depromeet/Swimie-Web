import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const code = formData.get('code');
    const idToken = formData.get('id_token');

    console.log('Received code:', code);
    console.log('Received id_token:', idToken);

    if (!code || !idToken) {
      return NextResponse.json(
        { error: 'code 또는 id_token이 누락되었습니다.' },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Code and ID token received' });
  } catch (error) {
    console.error('Error handling Apple OAuth POST request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
