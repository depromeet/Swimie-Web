'use client';

import { useFormContext } from 'react-hook-form';

/**
 * @description subInfo(심박수, 페이스, 칼로리) 필드 open 상태 관리 custom-hook
 */
export function useSubInfoTextFields() {
  const { setValue } = useFormContext();

  const onChangeHeartRate = (text: string) => {
    setValue('heartRate', Number(text));
  };

  const onChangePace = (text: string) => {
    setValue('pace', text);
  };

  const onChangeKcal = (text: string) => {
    setValue('kcal', Number(text));
  };

  return {
    handlers: {
      onChangeHeartRate,
      onChangePace,
      onChangeKcal,
    },
  };
}
