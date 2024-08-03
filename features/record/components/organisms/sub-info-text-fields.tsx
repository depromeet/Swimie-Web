'use client';

import { useFormContext } from 'react-hook-form';

import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

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
      <div className={paceStyles.layout}>
        <TextField
          label="페이스"
          value={watch('paceMinutes') ? String(watch('paceMinutes')) : ''}
          onChange={handlers.onChangePaceMinute}
          wrapperClassName={paceStyles.field}
        />
        <span className={css({ fontSize: '30px' })}>:</span>
        <TextField
          unit="/100m"
          value={watch('paceSeconds') ? String(watch('paceSeconds')) : ''}
          onChange={handlers.onChangePaceSecond}
          wrapperClassName={cx(paceStyles.field, css({ paddingTop: '24px' }))}
        />
      </div>
      <TextField
        label="칼로리"
        unit="Kcal"
        value={watch('kcal') ? String(watch('kcal')) : ''}
        onChange={handlers.onChangeKcal}
      />
    </>
  );
}

const paceStyles = {
  layout: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '23px',
  }),
  field: css({
    width: '42%',
  }),
};
