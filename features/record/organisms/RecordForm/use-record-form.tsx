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

interface SubInfoProps {
  poolName: string;
  totalMeters: number;
  totalLaps: number;
}

export function UseRecordForm(date: string) {
  //처음 기록 or 두번째 이상 기록일 때 default 값 달라져야함
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
  const [subInfo, setSubInfo] = useState<SubInfoProps>({
    poolName: '',
    totalMeters: 0,
    totalLaps: 0,
  });

  const changeStartTime = (startTime: string) => {
    setRecordInfo((prev) => ({ ...prev, startTime }));
  };

  const changeEndTime = (endTime: string) => {
    setRecordInfo((prev) => ({ ...prev, endTime }));
  };

  const changePool = (name: string, poolId: number) => {
    setRecordInfo((prev) => ({ ...prev, poolId }));
    setSubInfo((prev) => ({ ...prev, poolName: name }));
  };

  const changeRailLength = (value: number) => {
    setRecordInfo((prev) => ({
      ...prev,
      lane: Number(railLengthOptions[value].label.slice(0, -1)),
    }));
  };

  const changeTotalMeters = (totalMeters: number) => {
    setSubInfo((prev) => ({ ...prev, totalMeters }));
  };

  const changeTotalLaps = (totalLaps: number) => {
    setSubInfo((prev) => ({ ...prev, totalLaps }));
  };

  const changeStrokes = (
    strokes: {
      name: string;
      laps: number;
      meter: number;
    }[],
  ) => {
    setSubInfo((prev) => ({ ...prev, strokes: [...strokes] }));
  };

  return {
    recordInfo,
    subInfo,
    handlers: {
      changeStartTime,
      changeEndTime,
      changePool,
      changeRailLength,
      changeTotalMeters,
      changeTotalLaps,
      changeStrokes,
    },
  };
}
