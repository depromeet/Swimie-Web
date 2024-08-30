'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FormTextArea, FormTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface ProfileEditTextInfoSectionProps {
  nickNameLabel: string;
  nickNameSubText: string;
  introductionPlaceholder: string;
  currentNickname?: string;
  currentIntroduction?: string;
}

//Todo: 한줄 소개 현재 글자 수 세는 UI 추가
export function ProfileEditTextInfoSection({
  nickNameLabel,
  nickNameSubText,
  introductionPlaceholder,
  currentNickname,
  currentIntroduction,
}: ProfileEditTextInfoSectionProps) {
  const { register, control, setValue } = useFormContext();
  useEffect(() => {
    if (currentNickname) setValue('nickname', currentNickname);
    if (currentIntroduction) setValue('introduction', currentIntroduction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNickname, currentIntroduction]);

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
        placeholder={introductionPlaceholder}
      />
    </>
  );
}
