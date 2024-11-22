import { ChangeEvent } from 'react';

import { Button, TextCounter } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

import { BottomSheet } from '../bottom-sheet';

interface DirectCheerBottomSheetProps {
  isOpen: boolean;
  directCheerComment: string;
  onClickSendCheer: () => void;
  onChangeDirectCheerComment: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export function DirectCheerBottomSheet({
  isOpen,
  directCheerComment,
  onClickSendCheer,
  onChangeDirectCheerComment,
  onClose,
}: DirectCheerBottomSheetProps) {
  if (!isOpen) return null;
  return (
    <BottomSheet
      header={{
        title: '직접 입력',
      }}
      isOpen={isOpen}
      onClose={onClose}
      className={css({
        height: '546px',
      })}
    >
      <div className={inputStyles.container}>
        <span className={inputStyles.emoji}>💬</span>
        <input
          className={inputStyles.element}
          onChange={onChangeDirectCheerComment}
          maxLength={18}
        />
      </div>

      <div className={inputStyles.counter}>
        <TextCounter
          text={directCheerComment}
          threshold={18}
          className={css({ mb: '18px', p: '0 20px' })}
        />
      </div>

      <div className={ButtonContainerStyle}>
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
          className={css({ w: 'full' })}
          onClick={onClickSendCheer}
          disabled={directCheerComment.length === 0}
        />
      </div>
    </BottomSheet>
  );
}

const inputStyles = {
  container: flex({
    p: '0 20px',
    m: '24px 0 2px 0',
    alignItems: 'center',
  }),
  emoji: css({
    textStyle: 'heading2',
    fontWeight: 700,
  }),
  element: css({
    borderBottom: '2px solid',
    borderColor: 'line.alternative',
    w: 'full',
    ml: '4px',
    outline: 'none',
    textStyle: 'heading3',
    fontWeight: 500,
    p: '4px 0 4px 2px',
    '&:focus': {
      caretColor: 'primary.swim.총거리.default',
    },
  }),
  counter: flex({
    justifyContent: 'flex-end',
  }),
};

const ButtonContainerStyle = grid({
  position: 'absolute',
  bottom: '36px',
  p: '16px 20px 0px 20px',
  w: 'full',
  gridTemplateColumns: '1fr 1fr',
});
