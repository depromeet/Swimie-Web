'use server';

import { cookies } from 'next/headers';

export const saveSwimData = (
  startTime: string,
  endTime: string,
  poolName?: string,
  poolId?: number,
) => {
  const prevSwimStartTime = cookies().get('swimStartTime')?.value;
  const prevSwimEndTime = cookies().get('swimEndTime')?.value;
  const prevPoolName = cookies().get('poolName')?.value;
  const prevPoolID = cookies().get('poolId')?.value;

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
  if (poolName && poolId) {
    if (
      //저장된 수영장 이름이 없거나
      !prevPoolName ||
      //저장된 수영장 이름이 있지만, 현재 생성한 기록의 수영장 이름과 다르면
      (prevPoolName && prevPoolName !== poolName)
    )
      cookies().set('poolName', poolName, {
        maxAge: Infinity,
        httpOnly: true,
        secure: true,
      });
    if (
      //저장된 수영장 ID가 없거나
      !prevPoolID ||
      //저장된 수영장 ID가 있지만, 현재 생성한 기록의 수영장 ID와 다르면
      (prevPoolID && Number(prevPoolID) !== poolId)
    )
      cookies().set('poolId', String(poolId), {
        maxAge: Infinity,
        httpOnly: true,
        secure: true,
      });
  }
};
