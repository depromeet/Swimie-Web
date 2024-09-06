'use client';

import { useBottomSheet } from '@/hooks';
import { css } from '@/styled-system/css';

import { ReportBottomSheet } from '../components';

export const DetailReportFabSection = ({ memoryId }: { memoryId: string }) => {
  const { isOpen, close, open } = useBottomSheet();

  return (
    <>
      <button className={ReportButtonStyle} onClick={open}>
        기록 신고하기
      </button>
      <ReportBottomSheet isOpen={isOpen} onClose={close} memoryId={memoryId} />
    </>
  );
};

const ReportButtonStyle = css({
  textStyle: 'heading6',
  color: 'text.normal',
  fontWeight: 'medium',
  p: '8px 16px',
});
