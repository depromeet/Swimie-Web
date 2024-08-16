'use client';

import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { Button, DefaultImageIcon } from '@/components/atoms';
import { UserImageIcon } from '@/components/atoms/icons/user-image-icon';
import { FormTextArea, FormTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface ProfileEditFormProps {
  nickname?: string;
  introduce?: string;
}

//Todo: api 연결
//Todo: 한줄 소개 현재 글자 수 세는 UI 추가
export function ProfileEditForm() {
  const { register, control, handleSubmit } = useForm<ProfileEditFormProps>({
    defaultValues: {},
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit: SubmitHandler<ProfileEditFormProps> = async (data) => {
    console.log(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className={layoutStyles.form}>
      <section className={layoutStyles.imageEdit}>
        <div className={layoutStyles.imageEditIcon}>
          <UserImageIcon width={100} height={100} />
          <div className={layoutStyles.defaultImageIcon}>
            <DefaultImageIcon />
          </div>
        </div>
      </section>
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
      <div className={buttonStyles.layout}>
        <Button
          buttonType="primary"
          variant="solid"
          label="저장하기"
          size="large"
          className={buttonStyles.content}
        />
      </div>
    </form>
  );
}

const layoutStyles = {
  form: css({
    padding: '0 20px',
  }),
  imageEdit: flex({
    justifyContent: 'center',
    padding: '40px 0 0 0',
    marginBottom: '24px',
  }),
  imageEditIcon: flex({
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    marginBottom: '14px',
  }),
  defaultImageIcon: flex({
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '6px',
    right: '6px',
    borderRadius: 'full',
    width: '32px',
    height: '32px',
    backgroundColor: 'background.white',
    border: '1px solid',
    borderColor: 'line.solid.normal',
  }),
};

const buttonStyles = {
  layout: flex({
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0,
    padding: '16px 20px 32px 20px',
    zIndex: 10,
    backgroundColor: 'white',
  }),

  content: css({
    width: '100%',
    maxWidth: '560px',
  }),
};
