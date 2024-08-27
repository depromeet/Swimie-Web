'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { FormTextArea, FormTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface ProfileEditTextInfoSectionProps {
  nickNameLabel: string;
  nickNameSubText: string;
  introducePlaceholder: string;
}

//Todo: 한줄 소개 현재 글자 수 세는 UI 추가
export function ProfileEditTextInfoSection({
  nickNameLabel,
  nickNameSubText,
  introducePlaceholder,
}: ProfileEditTextInfoSectionProps) {
  const { register, control } = useFormContext();
  return (
    <>
      <FormTextField
        {...register('nickname')}
        registerdFieldValue={
          useWatch({
            control,
            name: 'nickname',
          }) as string
        }
        label={nickNameLabel}
        subText={nickNameSubText}
        maxLength={14}
        wrapperClassName={css({ marginBottom: '24px' })}
      />
      <FormTextArea
        {...register('introduction')}
        placeholder={introducePlaceholder}
      />
    </>
  );
}
