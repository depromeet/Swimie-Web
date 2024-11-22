import { ChangeEvent } from 'react';

import { Button } from '@/components/atoms';
import {
  BottomSheet,
  BottomSheetProps,
  DirectCheerBottomSheet,
} from '@/components/molecules';
import { DetailCheerItemSelected } from '@/features/record-detail';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

import { CheerItem } from './cheer-item';

type CheerBottomSheet = {
  isOpenDirectCheerBottomSheet: boolean;
  cheerList: DetailCheerItemSelected[];
  directCheerComment: string;
  onClickCheerItem: (index: number) => void;
  onClickSendCheer: () => void;
  onChangeDirectCheerComment: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpenDirectCheerBottomSheet: () => void;
  onCloseDirectCheerBottomSheet: () => void;
} & BottomSheetProps;
export const CheerBottomSheet = ({
  header,
  isOpen,
  onClose,
  cheerList,
  directCheerComment,
  isOpenDirectCheerBottomSheet,
  onChangeDirectCheerComment,
  onOpenDirectCheerBottomSheet,
  onCloseDirectCheerBottomSheet,
  onClickCheerItem,
  onClickSendCheer,
}: CheerBottomSheet) => {
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
          onClick={onOpenDirectCheerBottomSheet}
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
        isOpen={isOpenDirectCheerBottomSheet}
        directCheerComment={directCheerComment}
        onClickSendCheer={onClickSendCheer}
        onChangeDirectCheerComment={onChangeDirectCheerComment}
        onClose={onCloseDirectCheerBottomSheet}
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
