interface SwimTimeProps {
  start: string;
  end: string;
}

interface PoolInfoProps {
  name: string;
  id: number;
}

//로컬 스토리지에 저장되어 있는 수영 정보를 가져오는 함수
export const getSavedSwimData = () => {
  const savedSwimTimeData = localStorage.getItem('swimTime')
    ? (JSON.parse(localStorage.getItem('swimTime') as string) as SwimTimeProps)
    : undefined;

  const savedPoolInfoData = localStorage.getItem('poolInfo')
    ? (JSON.parse(localStorage.getItem('poolInfo') as string) as PoolInfoProps)
    : undefined;

  return { savedSwimTimeData, savedPoolInfoData };
};

//로컬 스토리지에 가장 최근 수영 기록 정보를 저장하는 함수
export const saveSwimData = (
  swimStartTime: string,
  swimEndTime: string,
  poolName?: string,
  poolId?: number,
) => {
  const { savedSwimTimeData, savedPoolInfoData } = getSavedSwimData();

  if (
    //저장된 수영 시간이 없거나
    !savedSwimTimeData ||
    //저장된 수영 시간이 있지만, 현재 생성한 기록의 수영 시간과 다르면
    (savedSwimTimeData &&
      (savedSwimTimeData.start !== swimStartTime ||
        savedSwimTimeData.end !== swimEndTime))
  )
    localStorage.setItem(
      'swimTime',
      JSON.stringify({ start: swimStartTime, end: swimEndTime }),
    );

  //현재 생성한 기록에 수영장 정보가 포함되어 있을 때
  if (poolName && poolId) {
    //저장된 수영장 정보가 없거나
    if (
      !savedPoolInfoData ||
      //저장된 수영장 정보가 있지만, 현재 생성한 기록의 수영장 정보와 다르다면
      (savedPoolInfoData && savedPoolInfoData.id !== poolId)
    ) {
      localStorage.setItem(
        'poolInfo',
        JSON.stringify({ name: poolName, id: poolId }),
      );
    }
  }
};
