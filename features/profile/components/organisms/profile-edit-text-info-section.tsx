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
        label={nickNameLabel}
        subText={nickNameSubText}
        maxLength={14}
        wrapperClassName={css({ marginBottom: '24px' })}
      />
      <FormTextArea
        {...register('introduce')}
        placeholder={introducePlaceholder}
      />
    </>
  );
}
