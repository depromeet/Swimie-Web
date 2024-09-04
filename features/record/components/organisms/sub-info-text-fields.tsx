'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { FormTextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export function SubInfoTextFields() {
  const { register, control } = useFormContext();

  return (
    <>
      <FormTextField
        {...register('heartRate')}
        registerdFieldValue={
          useWatch({
            control,
            name: 'heartRate',
          }) as number
        }
        preventDecimal
        maxLength={3}
        inputType="number"
        label="심박수"
        unit="BPM"
        wrapperClassName={css({ marginBottom: '23px' })}
      />
      <div className={paceStyles.layout}>
        <FormTextField
          {...register('paceMinutes')}
          registerdFieldValue={
            useWatch({
              control,
              name: 'paceMinutes',
            }) as number
          }
          preventDecimal
          maxLength={2}
          inputType="number"
          label="페이스"
          wrapperClassName={paceStyles.field}
        />
        <span className={css({ fontSize: '30px' })}>:</span>
        <FormTextField
          {...register('paceSeconds')}
          registerdFieldValue={
            useWatch({
              control,
              name: 'paceSeconds',
            }) as number
          }
          preventDecimal
          maxLength={2}
          inputType="number"
          unit="/100m"
          wrapperClassName={cx(paceStyles.field, css({ paddingTop: '24px' }))}
        />
      </div>
      <FormTextField
        {...register('kcal')}
        registerdFieldValue={
          useWatch({
            control,
            name: 'kcal' as string,
          }) as number
        }
        preventDecimal
        maxLength={4}
        inputType="number"
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
