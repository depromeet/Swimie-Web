'use client';

import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';

import { BackButton, HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { formSubInfoState } from '../../store/form-sub-info';
import { DeleteRecordButton } from '../atoms';

interface RecordHeaderBarProps {
  title: string;
}

export function RecordHeaderBar({ title }: RecordHeaderBarProps) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const memoryId = searchParams.get('memoryId');
  const isEditMode = Boolean(memoryId);
  const setFormSubInfo = useSetAtom(formSubInfoState);

  const handleBackButtonClick = () => {
    router.back();
    setFormSubInfo({
      imageFiles: [],
      isDistanceLapModified: false,
      isPrevImageFileDeleted: false,
    });
  };

  return (
    <HeaderBar className={css({ marginBottom: '16px' })}>
      <HeaderBar.LeftContent>
        <BackButton onClickBack={handleBackButtonClick} />
      </HeaderBar.LeftContent>
      <HeaderBar.Title>{title}</HeaderBar.Title>
      {isEditMode && (
        <HeaderBar.RightContent>
          {[
            {
              component: <DeleteRecordButton memoryId={memoryId as string} />,
              key: 'delete',
            },
          ]}
        </HeaderBar.RightContent>
      )}
    </HeaderBar>
  );
}
