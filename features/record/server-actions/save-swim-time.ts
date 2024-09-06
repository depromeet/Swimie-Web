'use server';

import { cookies } from 'next/headers';

export const saveSwimTime = (startTime: string, endTime: string) => {
  const prevStartTime = cookies().get('startTime')?.value;
  const prevEndTime = cookies().get('endTime')?.value;
  if (!prevStartTime || (prevStartTime && prevStartTime !== startTime))
    cookies().set('startTime', startTime, {
      maxAge: Infinity,
      httpOnly: true,
      secure: true,
    });
  if (!prevEndTime || (prevEndTime && prevEndTime !== endTime))
    cookies().set('endTime', endTime, {
      maxAge: Infinity,
      httpOnly: true,
      secure: true,
    });
};
