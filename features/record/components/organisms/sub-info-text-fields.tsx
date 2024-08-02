'use client';

import { useFormContext } from 'react-hook-form';

import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { useSubInfoTextFields } from '../../hooks';

export function SubInfoTextFields() {
  const { watch } = useFormContext();
  const { handlers } = useSubInfoTextFields();

  return (
    <>
      <TextField
        label="심박수"
        unit="BPM"
        value={watch('heartRate') ? String(watch('heartRate')) : ''}
        wrapperClassName={css({ marginBottom: '23px' })}
        onChange={handlers.onChangeHeartRate}
      />
      <TextField
        label="페이스"
        unit="/100m"
        value={watch('pace') ? (watch('pace') as string) : ''}
        wrapperClassName={css({ marginBottom: '23px' })}
        onChange={handlers.onChangePace}
      />
      <TextField
        label="칼로리"
        unit="Kcal"
        value={watch('kcal') ? String(watch('kcal')) : ''}
        onChange={handlers.onChangeKcal}
      />
    </>
  );
}
