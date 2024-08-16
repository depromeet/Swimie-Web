'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

interface ProfileEditFormProps {
  nickname?: string;
  introduce?: string;
}

export function ProfileEditForm() {
  const { handleSubmit } = useForm<ProfileEditFormProps>({
    defaultValues: {},
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit: SubmitHandler<ProfileEditFormProps> = async (data) => {
    //기록 수정 모드일 때
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.log(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}></form>
  );
}
