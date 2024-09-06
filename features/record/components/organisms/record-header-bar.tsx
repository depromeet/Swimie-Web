'use client';

import { useSearchParams } from 'next/navigation';

import { BackButton, HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { DeleteRecordButton } from '../atoms';

export function RecordHeaderBar() {
  const searchParams = useSearchParams();
  const memoryId = searchParams.get('memoryId');
  const isEditMode = Boolean(memoryId);

  return (
    <HeaderBar className={css({ marginBottom: '16px' })}>
      <HeaderBar.LeftContent>
        <BackButton />
      </HeaderBar.LeftContent>
      <HeaderBar.Title>수영 기록하기</HeaderBar.Title>
      {isEditMode && (
        <HeaderBar.RightContent>
          {[{ component: <DeleteRecordButton />, key: 'delete' }]}
        </HeaderBar.RightContent>
      )}
    </HeaderBar>
  );
}
