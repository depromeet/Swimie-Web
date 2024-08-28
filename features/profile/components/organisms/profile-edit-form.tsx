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

  const { isLoading, image, imageFile, handlers } = useProfileEditForm();

  const { data: currrentMemberData } = useCurrentMemberInfo();
  const { data: profileData } = useProfileData(currrentMemberData?.data.id);
  const { mutateAsync: getProfileImagePresignedUrl } =
    useGetProfileImagePresignedUrl();
  const { mutateAsync: imagePresign } = useImagePresignUrl();
  const { mutateAsync: profileImageUrlDone } = useProfileImageUrlDone(
    currrentMemberData?.data.id,
  );
  const { mutateAsync: profileTextEdit } = useProfileTextEdit(
    currrentMemberData?.data.id,
  );

  const handleProfileImageEditSuccess = (hasTextEditData: boolean) => {
    if (!hasTextEditData) {
      handlers.onChangeIsLoading(false);
      toast('프로필이 수정되었어요.');
      router.push(`/profile/${currrentMemberData?.data.id}`);
    }
  };

  //Todo: 성공 처리 구체화
  const handleProfileTextEditSuccess = () => {
    handlers.onChangeIsLoading(false);
    toast('프로필이 수정되었어요.');
    router.push(`/profile/${currrentMemberData?.data.id}`);
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

  //Todo: 에러 처리
  //Todo: 헤더의 저장버튼 클릭 시에도 수정 로직 수행
  const onSubmit: SubmitHandler<ProfileEditFormProps> = async (data) => {
    const hasTextEditData = Boolean(
      data.nickname?.trim() !== profileData?.nickname.trim() ||
        data?.introduction?.trim() !== profileData?.introduction,
    );

    const checkDefaultProfileEditted =
      (profileData?.profileImageUrl &&
        image &&
        !isNaN(parseInt(profileData?.profileImageUrl)) &&
        !isNaN(parseInt(image)) &&
        parseInt(profileData?.profileImageUrl) !== parseInt(image)) ||
      (profileData?.profileImageUrl &&
        image &&
        isNaN(parseInt(profileData?.profileImageUrl)) &&
        !isNaN(parseInt(image)));
    //사용자가 직접 선택한 사진이 있을 때
    if (imageFile) {
      const { data: presignedData } = await getProfileImagePresignedUrl(
        imageFile.name,
      );
      await imagePresign({
        presignedUrl: presignedData.presignedUrl,
        file: getBlobData(imageFile),
      });
      const profileImageUrlDoneRes = await profileImageUrlDone(
        presignedData.imageName,
      );
      if (profileImageUrlDoneRes.status === 200)
        handleProfileImageEditSuccess(hasTextEditData);
      else handleProfileEditError();
    }
    //디폴트 프로필로 수정했을 때
    else if (checkDefaultProfileEditted) {
      const profileImageUrlDoneRes = await profileImageUrlDone(image);
      if (profileImageUrlDoneRes.status === 200)
        handleProfileImageEditSuccess(hasTextEditData);
      else handleProfileEditError();
    }
    if (hasTextEditData) {
      //닉네임 or 자기소개를 수정할 때
      //닉네임이 비었을 때
      if (data.nickname === '') handleProfileNicknameBlank();
      else {
        const profileTextEditRes = await profileTextEdit(
          extractModifiedData(data),
        );
        if (profileTextEditRes.status === 200) handleProfileTextEditSuccess();
        else handleProfileEditError();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <ProfileEditImageSection
        image={image}
        currentProfileImage={profileData?.profileImageUrl}
        onChangeImage={handlers.onChangeImage}
        onChangeFile={handlers.onChangeImageFile}
      />
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={methods.handleSubmit(onSubmit)}
        className={layoutStyles.form}
      >
        <ProfileEditTextInfoSection
          nickNameLabel="닉네임"
          nickNameSubText="14자까지 입력할 수 있어요"
          introductionPlaceholder="한 줄 소개를 입력해주세요 (수린이 1년차 / 접영 드릴 연습중)"
          currentNickname={profileData?.nickname.trim()}
          currentIntroduction={profileData?.introduction.trim()}
        />
        <div className={buttonStyles.layout}>
          <Button
            isLoading={isLoading}
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
