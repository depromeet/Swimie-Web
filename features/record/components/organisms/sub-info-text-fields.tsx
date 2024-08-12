'use client';

import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export function SubInfoTextFields() {
  return (
    <>
      <TextField
        inputType="number"
        registerName="heartRate"
        label="심박수"
        unit="BPM"
        wrapperClassName={css({ marginBottom: '23px' })}
      />
      <div className={paceStyles.layout}>
        <TextField
          inputType="number"
          registerName="paceMinutes"
          label="페이스"
          wrapperClassName={paceStyles.field}
        />
        <span className={css({ fontSize: '30px' })}>:</span>
        <TextField
          inputType="number"
          registerName="paceSeconds"
          unit="/100m"
          wrapperClassName={cx(paceStyles.field, css({ paddingTop: '24px' }))}
        />
      </div>
      <TextField
        inputType="number"
        registerName="kcal"
        label="칼로리"
        unit="Kcal"
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
