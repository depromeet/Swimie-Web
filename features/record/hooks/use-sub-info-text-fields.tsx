'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * @description subInfo(심박수, 페이스, 칼로리) 필드 open 상태 관리 custom-hook
 */
export function useSubInfoTextFields() {
  const [isOpen, setIsOpen] = useState(false);
  const { setValue } = useFormContext();

  const onChangeFieldsOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
    isOpen,
    handlers: {
      onChangeFieldsOpen,
      onChangeHeartRate,
      onChangePace,
      onChangeKcal,
    },
  };
}
