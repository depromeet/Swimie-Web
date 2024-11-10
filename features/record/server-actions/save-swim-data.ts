'use server';

import { cookies } from 'next/headers';

import { PoolDataProps } from '../types';

export const saveSwimData = (
  startTime: string,
  endTime: string,
  poolData?: PoolDataProps,
) => {
  const prevSwimStartTime = cookies().get('swimStartTime')?.value;
  const prevSwimEndTime = cookies().get('swimEndTime')?.value;
  const prevPoolData = cookies().get('poolData')
    ? (JSON.parse(cookies().get('poolData')?.value as string) as PoolDataProps)
    : undefined;

  if (
    //저장된 수영 시작 시간이 없거나
    !prevSwimStartTime ||
    //저장된 수영 시작 시간이 있지만, 현재 생성한 기록의 수영 시작 시간과 다르면
    (prevSwimStartTime && prevSwimStartTime !== startTime)
  )
    cookies().set('swimStartTime', startTime, {
      maxAge: Infinity,
      httpOnly: true,
      secure: true,
    });

  if (
    //저장된 수영 종료 시간이 없거나
    !prevSwimEndTime ||
    //저장된 수영 종료 시간이 있지만, 현재 생성한 기록의 수영 종료 시간과 다르면
    (prevSwimEndTime && prevSwimEndTime !== endTime)
  )
    cookies().set('swimEndTime', endTime, {
      maxAge: Infinity,
      httpOnly: true,
      secure: true,
    });

  //현재 생성한 기록에 수영장 정보가 포함되어 있을 때
  if (poolData) {
    //저장된 수영장 정보가 없거나
    if (
      !prevPoolData ||
      //저장된 수영장 정보가 있지만, 현재 생성한 기록의 수영장 정보와 다르다면
      (prevPoolData && prevPoolData.id !== poolData.id)
    ) {
      cookies().set(
        'poolData',
        JSON.stringify({ name: poolData.name, id: poolData.id }),
        {
          maxAge: Infinity,
          httpOnly: true,
          secure: true,
        },
      );
    }
  }
};
