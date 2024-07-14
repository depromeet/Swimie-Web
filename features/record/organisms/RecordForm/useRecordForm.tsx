'use client';

import { useState } from 'react';

interface RecordInfoProps {
  date: string;
  startTime: string;
  endTime: string;
  pool: string;
  railLengthOption: number;
  distance: string;
}

export function UseRecordForm(date: string) {
  const [recordInfo, setRecordInfo] = useState<RecordInfoProps>({
    date,
    startTime: '',
    endTime: '',
    pool: '',
    railLengthOption: 0,
    distance: '',
  });

  const changeStartTime = (startTime: string) => {
    setRecordInfo((prev) => ({ ...prev, startTime }));
  };

  const changeEndTime = (endTime: string) => {
    setRecordInfo((prev) => ({ ...prev, endTime }));
  };

  const changePool = (pool: string) => {
    setRecordInfo((prev) => ({ ...prev, pool }));
  };

  const changeRailLength = (railLengthOption: number) => {
    setRecordInfo((prev) => ({ ...prev, railLengthOption }));
  };

  const changeDistance = (distance: string) => {
    setRecordInfo((prev) => ({ ...prev, distance }));
  };

  return {
    recordInfo,
    handlers: {
      changeStartTime,
      changeEndTime,
      changePool,
      changeRailLength,
      changeDistance,
    },
  };
}
