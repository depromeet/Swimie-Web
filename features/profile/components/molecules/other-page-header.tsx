'use client';

import { useRouter } from 'next/navigation';

import { BackButton, HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { useBlockDialogHandler } from '../../hooks';
import { ProfileProps } from '../../types';
import { BlockButton } from '../atoms';

export function OtherPageHeader({
  profileData,
}: {
  profileData: ProfileProps['data'];
}) {
  const router = useRouter();
  const { nickname, memberId } = profileData;
  const { openBlockModal } = useBlockDialogHandler({ nickname, memberId });

  const handleClickOpenBlockModal = () => {
    openBlockModal();
  };
  return (
    <HeaderBar>
      <HeaderBar.LeftContent>
        <BackButton onClickBack={() => router.back()} />
      </HeaderBar.LeftContent>
      <HeaderBar.RightContent className={css({ right: '20px' })}>
        {[
          {
            component: <BlockButton onClick={handleClickOpenBlockModal} />,
            key: 'black',
          },
        ]}
      </HeaderBar.RightContent>
    </HeaderBar>
  );
}
