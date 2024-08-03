'use client';

import { useFormContext } from 'react-hook-form';

/**
 * @description subInfo(심박수, 페이스, 칼로리) 필드 open 상태 관리 custom-hook
 */
export function useSubInfoTextFields() {
  const { setValue } = useFormContext();

  const onChangeHeartRate = (text: string) => {
    if (text) setValue('heartRate', Number(text));
    else setValue('heartRate', undefined);
  };

  const onChangePaceMinute = (text: string) => {
    if (text) setValue('paceMinutes', Number(text));
    else setValue('paceMinutes', undefined);
  };

  const onChangePaceSecond = (text: string) => {
    if (text) setValue('paceSeconds', Number(text));
    else setValue('paceSeconds', undefined);
  };

  const onChangeKcal = (text: string) => {
    if (text) setValue('kcal', Number(text));
    else setValue('kcal', undefined);
  };

  return {
    handlers: {
      onChangeHeartRate,
      onChangePaceMinute,
      onChangePaceSecond,
      onChangeKcal,
    },
  };
}
