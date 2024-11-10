'use server';

import { cookies } from 'next/headers';

import { PoolInfoDataProps, SwimTimeDataProps } from '../types';

interface SaveSwimDataProps {
  swimTimeData: SwimTimeDataProps;
  savedSwimTimeData?: SwimTimeDataProps;
  poolInfoData?: PoolInfoDataProps;
  savedPoolInfoData?: PoolInfoDataProps;
}

//cookie에 가장 최근 수영 기록 정보를 저장하는 함수
export const saveSwimData = ({
  swimTimeData,
  savedSwimTimeData,
  poolInfoData,
  savedPoolInfoData,
}: SaveSwimDataProps) => {
  if (
    //저장된 수영 시간이 없거나
    !savedSwimTimeData ||
    //저장된 수영 시간이 있지만, 현재 생성한 기록의 수영 시간과 다르면
    (savedSwimTimeData &&
      (savedSwimTimeData.start !== swimTimeData.start ||
        savedSwimTimeData.end !== swimTimeData.end))
  )
    cookies().set(
      'swimTime',
      JSON.stringify({ start: swimTimeData.start, end: swimTimeData.end }),
      {
        maxAge: Infinity,
        httpOnly: true,
        secure: true,
      },
    );

  //현재 생성한 기록에 수영장 정보가 포함되어 있을 때
  if (poolInfoData) {
    //저장된 수영장 정보가 없거나
    if (
      !savedPoolInfoData ||
      //저장된 수영장 정보가 있지만, 현재 생성한 기록의 수영장 정보와 다르다면
      (savedPoolInfoData && savedPoolInfoData.id !== poolInfoData.id)
    ) {
      cookies().set(
        'poolInfo',
        JSON.stringify({ name: poolInfoData.name, id: poolInfoData.id }),
        {
          maxAge: Infinity,
          httpOnly: true,
          secure: true,
        },
      );
    }
  }
};
