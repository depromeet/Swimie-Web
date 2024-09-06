import { useRouter } from 'next/navigation';

import { BackButton, HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { useBlockDialogHandler } from '../../hooks/use-block-dialog-handler';
import { ProfileProps } from '../../types';
import { BlockButton } from '../atoms';

export function OtherPageHeader({
  profileData,
}: {
  profileData: ProfileProps['data'];
}) {
  const router = useRouter();
  const { nickname } = profileData;
  const { openBlockModal } = useBlockDialogHandler(nickname);

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
