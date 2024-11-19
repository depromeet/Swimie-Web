'use client';

import { useState } from 'react';

import { Button } from '@/components/atoms';
import { BottomSheet, BottomSheetProps } from '@/components/molecules';
import { DetailCheerItemSelected } from '@/features/record-detail';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

import { CheerItem } from './cheer-item';
import { DirectCheerBottomSheet } from './direct-cheer-bottom-sheet';

type CheerBottomSheet = {
  memoryId: number;
  cheerList: DetailCheerItemSelected[];
  onClickCheerItem: (index: number) => void;
  onClickSendCheer: () => void;
} & BottomSheetProps;
export const CheerBottomSheet = ({
  header,
  memoryId,
  isOpen,
  onClose,
  cheerList,
  onClickCheerItem,
  onClickSendCheer,
}: CheerBottomSheet) => {
  const [isDirectCheerBottomSheetOpen, setIsDirectCheerBottomSheetOpen] =
    useState(false);

  const handleClickDirectCheer = () => {
    setIsDirectCheerBottomSheetOpen(true);
  };

  const handleCloseDirectCheerBottomSheet = () => {
    setIsDirectCheerBottomSheetOpen(false);
  };
  return (
    <>
      <BottomSheet header={header} isOpen={isOpen} onClose={onClose}>
        <div className={tagContainerStyle}>
          {cheerList.map((item, index) => (
            <CheerItem
              key={index}
              onClick={() => onClickCheerItem(index)}
              {...item}
            />
          ))}
        </div>
        <p
          className={directInputContainerStyle}
          onClick={handleClickDirectCheer}
        >
          직접 입력 +
        </p>
        <div className={buttonContainerStyle}>
          <Button
            label="닫기"
            variant="outlined"
            size="large"
            onClick={onClose}
          />
          <Button
            label="보내기"
            size="large"
            variant="solid"
            buttonType="primary"
            onClick={onClickSendCheer}
            disabled={!cheerList.find(({ isSelected }) => isSelected)}
          />
        </div>
      </BottomSheet>
      <DirectCheerBottomSheet
        isOpen={isDirectCheerBottomSheetOpen}
        memoryId={memoryId}
        onClose={handleCloseDirectCheerBottomSheet}
      />
    </>
  );
};

const tagContainerStyle = flex({
  wrap: 'wrap',
  gap: '10px',
  rowGap: '10px',
  p: '8px 20px',
});

const directInputContainerStyle = css({
  p: '8px 20px',
  color: 'primary.swim.총거리.default',
  textStyle: 'body1.normal',
});

const buttonContainerStyle = grid({
  gap: '10px',
  p: '16px 20px 0 20px',
  gridTemplateColumns: '1fr 1fr',
});
