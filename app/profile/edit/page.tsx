import dynamic from 'next/dynamic';

import { LeftArrowIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { BlueTextButton, ProfileEditForm } from '@/features/profile';
const DynamicBackButton = dynamic(
  () => import('@/components/molecules').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => <LeftArrowIcon />,
  },
);

//Todo: api 연결
export default function ProfileEditPage() {
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>프로필 편집</HeaderBar.Title>
        <HeaderBar.RightContent>
          {[{ component: <BlueTextButton label="저장" />, key: 'save' }]}
        </HeaderBar.RightContent>
      </HeaderBar>
      <ProfileEditForm />
    </>
  );
}
