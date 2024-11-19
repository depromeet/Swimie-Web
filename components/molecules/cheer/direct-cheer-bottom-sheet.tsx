import { ChangeEvent, useState } from 'react';

import { Button, TextCounter } from '@/components/atoms';
import { useCheer, useCheerEligibility } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { BottomSheet } from '../bottom-sheet';

interface DirectCheerBottomSheetProps {
  isOpen: boolean;
  memoryId: number;
  onClose: () => void;
}

export function DirectCheerBottomSheet({
  isOpen,
  memoryId,
  onClose,
}: DirectCheerBottomSheetProps) {
  const [cheerComment, setCheerComment] = useState('');

  const { mutate: mutateCheer } = useCheer();
  const { refetch: refetchCheerEligibility } = useCheerEligibility(
    memoryId,
    false,
  );

  const handleChangeCheerText = (event: ChangeEvent<HTMLInputElement>) => {
    setCheerComment(event.target.value);
  };

  const handleSendCheerClick = () => {
    mutateCheer(
      {
        emoji: '💬',
        comment: cheerComment,
        memoryId,
      },
      {
        onSuccess: ({ status, code, message }) => {
          if (status === 400 || code === 'REACTION_4') {
            alert(message);
            return;
          }

          onClose();
          void refetchCheerEligibility();
        },
      },
    );
  };

  if (!isOpen) return null;
  return (
    <BottomSheet
      header={{
        title: '응원 직접 입력',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={inputStyles.container}>
        <span className={inputStyles.emoji}>💬</span>
        <input
          className={inputStyles.element}
          onChange={handleChangeCheerText}
          maxLength={18}
        />
      </div>

      <div className={inputStyles.counter}>
        <TextCounter
          text={cheerComment}
          threshold={18}
          className={css({ mb: '18px', p: '0 20px' })}
        />
      </div>

      <div className={ButtonContainerStyle}>
        <Button
          label="보내기"
          size="large"
          variant="solid"
          buttonType="primary"
          onClick={handleSendCheerClick}
          className={css({ w: 'full' })}
          disabled={cheerComment.length === 0}
        />
      </div>
    </BottomSheet>
  );
}

const inputStyles = {
  container: flex({
    p: '0 20px',
    mb: '2px',
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

const ButtonContainerStyle = css({
  p: '16px 20px 0px 20px',
  w: 'full',
});
