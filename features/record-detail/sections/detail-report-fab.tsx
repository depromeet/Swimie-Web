'use client';

import { MenuIcon } from '@/components/atoms';
import { Menu } from '@/components/molecules';
import { useBottomSheet, useMenu } from '@/hooks';
import { css } from '@/styled-system/css';

import { ReportBottomSheet } from '../components';

export const DetailReportFabSection = ({ memoryId }: { memoryId: string }) => {
  const {
    isOpen: isMenuOpen,
    close: closeMenu,
    toggle: toggleMenu,
  } = useMenu();
  const {
    isOpen: isBottomSheetOpen,
    close: closeBottomSheet,
    open: openBottomSheet,
  } = useBottomSheet();

  return (
    <>
      <div className={menuLayoutStyles}>
        <MenuIcon onClick={toggleMenu} />
        <Menu
          isOpen={isMenuOpen}
          menuItems={[
            {
              label: '기록 신고하기',
              onClick: openBottomSheet,
            },
          ]}
          onClose={closeMenu}
          className={css({ right: 0 })}
        />
      </div>
      <ReportBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        memoryId={memoryId}
      />
    </>
  );
};

const menuLayoutStyles = css({
  position: 'relative',
});
