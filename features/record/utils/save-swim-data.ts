import { PoolDataProps } from '../types';

export const saveSwimData = (
  swimStartTime: string,
  swimEndTime: string,
  poolData?: PoolDataProps,
) => {
  const prevSwimStartTime = localStorage.getItem('swimStartTime');
  const prevSwimEndTime = localStorage.getItem('swimEndTime');
  const prevPoolData = localStorage.getItem('poolData')
    ? (JSON.parse(localStorage.getItem('poolData') as string) as PoolDataProps)
    : undefined;

  if (
    //저장된 수영 시작 시간이 없거나
    !prevSwimStartTime ||
    //저장된 수영 시작 시간이 있지만, 현재 생성한 기록의 수영 시작 시간과 다르면
    (prevSwimStartTime && prevSwimStartTime !== swimStartTime)
  )
    localStorage.setItem('swimStartTime', swimStartTime);

  if (
    //저장된 수영 종료 시간이 없거나
    !prevSwimEndTime ||
    //저장된 수영 종료 시간이 있지만, 현재 생성한 기록의 수영 종료 시간과 다르면
    (prevSwimEndTime && prevSwimEndTime !== swimEndTime)
  )
    localStorage.setItem('swimEndTime', swimEndTime);

  //현재 생성한 기록에 수영장 정보가 포함되어 있을 때
  if (poolData) {
    //저장된 수영장 정보가 없거나
    if (
      !prevPoolData ||
      //저장된 수영장 정보가 있지만, 현재 생성한 기록의 수영장 정보와 다르다면
      (prevPoolData && prevPoolData.id !== poolData.id)
    ) {
      localStorage.setItem(
        'poolData',
        JSON.stringify({ name: poolData.name, id: poolData.id }),
      );
    }
  }
};
