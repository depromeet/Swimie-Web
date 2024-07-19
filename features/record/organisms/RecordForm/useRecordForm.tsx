'use client';

import { useState } from 'react';

import { railLengthOptions } from './options';

interface RecordInfoProps {
  poolId: number | null;
  item: string | null;
  heartRate: number | null;
  pace: string | null;
  kcal: number | null;
  recordAt: string; // 필수
  startTime: string; // 필수
  endTime: string; // 필수
  lane: number;
  diary: string | null;
  strokes: {
    name: string;
    laps: number;
    meter: number;
  }[];
  imageIdList: number[];
}

export function UseRecordForm(date: string) {
  const [recordInfo, setRecordInfo] = useState<RecordInfoProps>({
    poolId: null,
    item: null,
    heartRate: null,
    pace: null,
    kcal: null,
    recordAt: date, // 필수
    startTime: '', // 필수
    endTime: '', // 필수
    lane: 25,
    diary: null,
    strokes: [],
    imageIdList: [],
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

  const changeRailLength = (value: number) => {
    setRecordInfo((prev) => ({
      ...prev,
      lane: Number(railLengthOptions[value].label.slice(0, -1)),
    }));
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
