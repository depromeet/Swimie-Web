'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useImagePresignUrl } from '@/apis';
import { Button } from '@/components/atoms';
import { useCurrentMemberInfo, useToast } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getBlobData } from '@/utils';

import {
  useGetProfileImagePresignedUrl,
  useProfileImageUrlDone,
  useProfileTextEdit,
} from '../../apis';
import { useProfileData, useProfileEditForm } from '../../hooks';
import { ProfileEditImageSection } from './profile-edit-image-section';
import { ProfileEditTextInfoSection } from './profile-edit-text-info-section';

interface ProfileEditFormProps {
  nickname: string;
  introduction: string;
}

//Todo: 한줄 소개 현재 글자 수 세는 UI 추가
export function ProfileEditForm() {
  const router = useRouter();

  const methods = useForm<ProfileEditFormProps>({
    defaultValues: {},
  });
  const { toast } = useToast();

  const { imageFile, defaultProfileIndex, handlers } = useProfileEditForm();

  const { data: currrentMemberData } = useCurrentMemberInfo();
  const { data: profileData } = useProfileData(currrentMemberData?.data.id);
  const { mutateAsync: getProfileImagePresignedUrl } =
    useGetProfileImagePresignedUrl();
  const { mutateAsync: imagePresign } = useImagePresignUrl();
  const { mutateAsync: profileImageUrlDone } = useProfileImageUrlDone();
  const { mutateAsync: profileTextEdit } = useProfileTextEdit(
    currrentMemberData?.data.id,
  );

  const handleProfileImageEditSuccess = (
    hasTextEditData: boolean,
    memberId: number,
  ) => {
    if (!hasTextEditData) {
      handlers.onChangeIsLoading(false);
      toast('프로필이 수정되었어요.');
      router.push(`/profile/${memberId}`);
    }
  };

  //Todo: 성공 처리 구체화
  const handleProfileTextEditSuccess = (memberId: number) => {
    handlers.onChangeIsLoading(false);
    toast('프로필이 수정되었어요.');
    router.push(`/profile/${memberId}`);
  };

  //Todo: 에러 처리 구체화
  const handleProfileEditError = () => {
    alert('프로필 수정 중 오류가 발생하였습니다.');
    handlers.onChangeIsLoading(false);
    return;
  };

  const handleProfileNicknameBlank = () => {
    toast('닉네임을 설정해주세요.', { type: 'error', delay: 1000 });
    return;
  };

  const extractModifiedData = (data: ProfileEditFormProps) => {
    const modifiedData: Partial<ProfileEditFormProps> = { ...data };

    if (data.nickname?.trim() === profileData?.nickname.trim()) {
      delete modifiedData.nickname;
    }
    if (data.introduction?.trim() === profileData?.introduction.trim()) {
      delete modifiedData.introduction;
    }

    return modifiedData;
  };

  //Todo: 기본 프로필 api 처리
  //Todo: 에러 처리
  //Todo: 헤더의 저장버튼 클릭 시에도 수정 로직 수행
  //Todo: 이전 프로필 정보 화면에 반영
  const onSubmit: SubmitHandler<ProfileEditFormProps> = async (data) => {
    const hasTextEditData = Boolean(
      data.nickname?.trim() !== profileData?.nickname.trim() ||
        data?.introduction?.trim() !== profileData?.introduction,
    );
    //사용자가 직접 선택한 사진이 있을 때
    if (imageFile) {
      const { data } = await getProfileImagePresignedUrl(imageFile.name);
      await imagePresign({
        presignedUrl: data.presignedUrl,
        file: getBlobData(imageFile),
      });
      const profileImageUrlDoneRes = await profileImageUrlDone(data.imageName);
      if (profileImageUrlDoneRes.status === 200)
        handleProfileImageEditSuccess(
          hasTextEditData,
          profileImageUrlDoneRes.data.memberId,
        );
      else handleProfileEditError();
    }
    //닉네임 or 자기소개를 수정할 때
    if (hasTextEditData) {
      //닉네임이 비었을 때
      if (data.nickname === '') handleProfileNicknameBlank();
      else {
        const profileTextEditRes = await profileTextEdit(
          extractModifiedData(data),
        );
        if (profileTextEditRes.status === 200)
          handleProfileTextEditSuccess(profileTextEditRes.data.memberId);
        else handleProfileEditError();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={methods.handleSubmit(onSubmit)}
        className={layoutStyles.form}
      >
        <ProfileEditImageSection
          defaultProfileIndex={defaultProfileIndex}
          onChangeDefaultProfileIndex={handlers.onChangeDefaultProfileIndex}
          onChangeFile={handlers.onChangeImageFile}
        />
        <ProfileEditTextInfoSection
          nickNameLabel="닉네임"
          nickNameSubText="14자까지 입력할 수 있어요"
          introductionPlaceholder="한 줄 소개를 입력해주세요 (수린이 1년차 / 접영 드릴 연습중)"
          currentNickname={profileData?.nickname.trim()}
          currentIntroduction={profileData?.introduction.trim()}
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
    </FormProvider>
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
