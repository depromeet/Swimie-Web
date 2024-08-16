import { HeaderBar } from '@/components/molecules';
import { BlueTextButton, ProfileEditForm } from '@/features/profile';

//Todo: api 연결
export default function ProfileEditPage() {
  return (
    <>
      <HeaderBar>
        <HeaderBar.BackButton />
        <HeaderBar.Title>프로필 편집</HeaderBar.Title>
        <HeaderBar.RightContent>
          {[{ component: <BlueTextButton label="저장" />, key: 'save' }]}
        </HeaderBar.RightContent>
      </HeaderBar>
      <ProfileEditForm />
    </>
  );
}
