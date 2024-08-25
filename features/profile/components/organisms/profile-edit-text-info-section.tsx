'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { FormTextArea, FormTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

//Todo: 한줄 소개 현재 글자 수 세는 UI 추가
export function ProfileEditTextInfoSection() {
  const { register, control } = useFormContext();
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <>
      <FormTextField
        {...register('nickname')}
        registerdFieldValue={
          useWatch({
            control,
            name: 'nickname' as const,
          }) as string
        }
        label="닉네임"
        subText="14자까지 입력할 수 있어요"
        maxLength={14}
        wrapperClassName={css({ marginBottom: '24px' })}
      />
      <FormTextArea
        {...register('introduce')}
        placeholder="한 줄 소개를 입력해주세요 (수린이 1년차 / 접영 드릴 연습중)"
      />
    </>
  );
}
