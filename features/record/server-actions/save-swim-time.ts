'use server';

import { cookies } from 'next/headers';

export const saveSwimTime = (startTime: string, endTime: string) => {
  const prevSwimStartTime = cookies().get('swimStartTime')?.value;
  const prevSwimEndTime = cookies().get('swimEndTime')?.value;
  if (
    !prevSwimStartTime ||
    (prevSwimStartTime && prevSwimStartTime !== startTime)
  )
    cookies().set('swimStartTime', startTime, {
      maxAge: Infinity,
      httpOnly: true,
      secure: true,
    });
  if (!prevSwimEndTime || (prevSwimEndTime && prevSwimEndTime !== endTime))
    cookies().set('swimEndTime', endTime, {
      maxAge: Infinity,
      httpOnly: true,
      secure: true,
    });
};
