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
  imageFiles: File[];
}

export function useRecordForm(date: string) {
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
    imageFiles: [],
  });

  const onSelectStartTime = (startTime: string) => {
    setRecordInfo((prev) => ({ ...prev, startTime }));
  };

  const onSelectEndTime = (endTime: string) => {
    setRecordInfo((prev) => ({ ...prev, endTime }));
  };

  const onSelectPool = (value: { name: string; poolId: number }) => {
    setRecordInfo((prev) => ({ ...prev, poolId: value.poolId }));
    setSubInfo((prev) => ({ ...prev, poolName: value.name }));
  };

  const onSelectRailLength = (value: number) => {
    setRecordInfo((prev) => ({
      ...prev,
      lane: Number(railLengthOptions[value].label.slice(0, -1)),
    }));
  };

  const onChangeTotalMeters = (totalMeters: number) => {
    setSubInfo((prev) => ({ ...prev, totalMeters }));
    setRecordInfo((prev) => ({
      ...prev,
      strokes: [
        {
          name: '총거리',
          laps: 0,
          meter: totalMeters,
        },
      ],
    }));
  };

  const onChangeTotalLaps = (totalLaps: number) => {
    setSubInfo((prev) => ({ ...prev, totalLaps }));
    setRecordInfo((prev) => ({
      ...prev,
      strokes: [
        {
          name: '총거리',
          laps: totalLaps,
          meter: 0,
        },
      ],
    }));
  };

  const onChangeStrokes = (
    strokes: {
      name: string;
      laps: number;
      meter: number;
    }[],
  ) => {
    setSubInfo((prev) => ({ ...prev, strokes: [...strokes] }));
  };

  const onSelectImage = (file: File) => {
    setSubInfo((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, file],
    }));
  };

  const onChangeDiary = (diary: string) => {
    setRecordInfo((prev) => ({ ...prev, diary: diary ? diary : null }));
  };

  return {
    recordInfo,
    subInfo,
    handlers: {
      onSelectStartTime,
      onSelectEndTime,
      onSelectPool,
      onSelectRailLength,
      onChangeTotalMeters,
      onChangeTotalLaps,
      onChangeStrokes,
      onSelectImage,
      onChangeDiary,
    },
  };
}
