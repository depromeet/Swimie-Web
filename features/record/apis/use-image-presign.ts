'use client';

import { useMutation } from '@tanstack/react-query';
import { NextResponse } from 'next/server';

async function imagePresignUrl(data: {
  presignedUrl: string;
  file: Blob;
}): Promise<{ status: number }> {
  const res = await fetch(data.presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.file),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (res.ok) {
    return NextResponse.json({ status: 200 });
  } else return NextResponse.json({ status: 404 });
}

export function useImagePresignUrl() {
  return useMutation({
    mutationFn: imagePresignUrl,
  });
}
