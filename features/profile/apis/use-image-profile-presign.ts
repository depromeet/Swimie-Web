'use client';

import { useMutation } from '@tanstack/react-query';
import { NextResponse } from 'next/server';

async function imageProfilePresignUrl(data: {
  presignedUrl: string;
  file: Blob;
}) {
  const res = await fetch(data.presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/webp',
    },
    body: data.file,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (res.ok) {
    return NextResponse.json({ status: 200 });
  } else return NextResponse.json({ status: 404 });
}

export function useImageProfilePresignUrl() {
  return useMutation({
    mutationFn: imageProfilePresignUrl,
  });
}
