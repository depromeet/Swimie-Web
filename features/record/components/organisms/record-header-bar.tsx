'use client';

import { useSearchParams } from 'next/navigation';

import { BackButton, HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { DeleteRecordButton } from '../atoms';

interface RecordHeaderBarProps {
  title: string;
}

export function RecordHeaderBar({ title }: RecordHeaderBarProps) {
  const searchParams = useSearchParams();
  const memoryId = searchParams.get('memoryId');
  const isEditMode = Boolean(memoryId);

  return (
    <HeaderBar className={css({ marginBottom: '16px' })}>
      <HeaderBar.LeftContent>
        <BackButton />
      </HeaderBar.LeftContent>
      <HeaderBar.Title>{title}</HeaderBar.Title>
      {isEditMode && (
        <HeaderBar.RightContent>
          {[{ component: <DeleteRecordButton />, key: 'delete' }]}
        </HeaderBar.RightContent>
      )}
    </HeaderBar>
  );
}
