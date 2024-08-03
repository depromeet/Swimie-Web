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

  const onChangePace = (text: string) => {
    if (text) setValue('pace', text);
    else setValue('pace', undefined);
  };

  const onChangeKcal = (text: string) => {
    if (text) setValue('kcal', Number(text));
    else setValue('kcal', undefined);
  };

  return {
    handlers: {
      onChangeHeartRate,
      onChangePace,
      onChangeKcal,
    },
  };
}
