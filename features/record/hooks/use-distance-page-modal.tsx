'use client';

import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { strokeOptions } from '../components/organisms/stroke-distance-fields';
import { isDistancePageModalOpen } from '../store';
import { StrokeProps } from '../types';

type tabIndex = 0 | 1;

export function useDistancePageModal<T>(lane: number) {
  const pageModalRef = useRef<T>(null);
  const setPageModalState = useSetAtom(isDistancePageModalOpen);
  const [secondaryTabIndex, setSecondaryTabIndex] = useState<tabIndex>(0);
  const [assistiveTabIndex, setAssistiveTabIndex] = useState<tabIndex>(0);
  const [totalMeter, setTotalMeter] = useState<string>('');
  const [totalLaps, setTotalLaps] = useState<string>('');
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [strokeMeterTotalDistance, setStrokeMeterTotalDistance] =
    useState<number>(0);
  const [strokeLapsTotalDistance, setStrokeLapsTotalDistance] =
    useState<number>(0);
  const [strokes, setStrokes] = useState<StrokeProps[]>(
    Array.from({ length: strokeOptions.length }, (_, i) => ({
      name: strokeOptions[i],
      laps: 0,
      meter: 0,
    })),
  );
  const [strokesMeterModified, setStrokesMeterModified] =
    useState<boolean>(false);
  const [strokesLapsModified, setStrokesLapsModified] =
    useState<boolean>(false);

  useEffect(() => {
    let sum = 0;
    if (assistiveTabIndex === 0) {
      strokes.forEach((stroke) => {
        sum += stroke.meter;
      });
      setStrokeMeterTotalDistance(sum);
    } else {
      strokes.forEach((stroke) => {
        sum += stroke.laps * lane;
      });
      setStrokeLapsTotalDistance(sum);
    }
  }, [assistiveTabIndex, strokes, lane]);

  const onClosePageModal = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };

  const onChangeSecondaryTabIndex = (index: tabIndex) => {
    setSecondaryTabIndex(index);
  };

  const onChangeAssistiveTabIndex = (index: tabIndex) => {
    setAssistiveTabIndex(index);
  };

  const onChangeTotalMeter = (text: string) => {
    totalLaps && setTotalLaps('');
    setTotalMeter(text);
  };

  const onChangeTotalLaps = (text: string) => {
    totalMeter && setTotalMeter('');
    setTotalLaps(text);
    setTotalDistance(text ? Number(text) * lane : 0);
  };

  const onChangeStroke = (index: number, text: string) => {
    totalLaps && setTotalLaps('');
    totalMeter && setTotalMeter('');
    if (assistiveTabIndex === 0) {
      !strokesMeterModified && setStrokesMeterModified(true);
      strokeLapsTotalDistance && setStrokeLapsTotalDistance(0);
      if (strokesLapsModified) {
        resetStrokesLaps();
        setStrokesLapsModified(false);
      }
    } else if (assistiveTabIndex === 1) {
      !strokesLapsModified && setStrokesLapsModified(true);
      strokeMeterTotalDistance && setStrokeMeterTotalDistance(0);
      if (strokesMeterModified) {
        resetStrokesMeter();
        setStrokesMeterModified(false);
      }
    }
    setStrokes((prev) => {
      const copyStrokes = [...prev];
      assistiveTabIndex === 0
        ? (copyStrokes[index] = { ...copyStrokes[index], meter: Number(text) })
        : (copyStrokes[index] = { ...copyStrokes[index], laps: Number(text) });
      return copyStrokes;
    });
  };

  const resetStrokesMeter = () => {
    strokes.forEach((stroke, i) => {
      if (stroke.meter)
        setStrokes((prev) => {
          const copyStrokes = [...prev];
          copyStrokes[i] = { ...copyStrokes[i], meter: 0 };
          return copyStrokes;
        });
    });
  };

  const resetStrokesLaps = () => {
    strokes.forEach((stroke, i) => {
      if (stroke.laps)
        setStrokes((prev) => {
          const copyStrokes = [...prev];
          copyStrokes[i] = { ...copyStrokes[i], laps: 0 };
          return copyStrokes;
        });
    });
  };

  const buttonLabel = () => {
    if (secondaryTabIndex === 0) {
      if (assistiveTabIndex === 0) return '완료';
      else return `${totalDistance ? totalDistance + 'm' : ''} 완료`;
    } else {
      if (assistiveTabIndex === 0)
        return `${strokeMeterTotalDistance ? strokeMeterTotalDistance + 'm' : ''} 완료`;
      else
        return `${strokeLapsTotalDistance ? strokeLapsTotalDistance + 'm' : ''} 완료`;
    }
  };

  return {
    pageModalRef,
    secondaryTabIndex,
    assistiveTabIndex,
    totalMeter,
    totalLaps,
    totalDistance,
    strokeMeterTotalDistance,
    strokeLapsTotalDistance,
    strokes,
    buttonLabel,
    handlers: {
      onClosePageModal,
      onChangeSecondaryTabIndex,
      onChangeAssistiveTabIndex,
      onChangeTotalMeter,
      onChangeTotalLaps,
      onChangeStroke,
    },
  };
}
