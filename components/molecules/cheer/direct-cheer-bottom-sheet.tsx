import { Button, Image } from '@/components/atoms';
import DirectCheerImage from '@/public/images/direct-cheer.png';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { BottomSheet } from '../bottom-sheet';

interface DirectCheerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DirectCheerBottomSheet({
  isOpen,
  onClose,
}: DirectCheerBottomSheetProps) {
  if (!isOpen) return null;
  return (
    <BottomSheet
      header={{
        title: '응원 직접 입력',
      }}
      isOpen={isOpen}
      onClose={onClose}
      className={css({ zIndex: 560 })}
    >
      <div className={ImageContainerStyle}>
        <Image
          src={DirectCheerImage}
          alt="응원 직접 입력"
          width={64}
          height={64}
        />
      </div>
      <div className={inputStyles.container}>
        <input className={inputStyles.element} />
      </div>
      <div className={ButtonContainerStyle}>
        <Button
          label="보내기"
          size="large"
          variant="solid"
          buttonType="primary"
          className={css({ w: 'full' })}
        />
      </div>
    </BottomSheet>
  );
}

const ImageContainerStyle = flex({
  justifyContent: 'center',
  m: '27px 0 16px 0',
});

const inputStyles = {
  container: css({
    p: '20px',
    mb: '18px',
  }),
  element: css({
    borderBottom: '2px solid',
    borderColor: 'line.alternative',
    w: 'full',
    outline: 'none',
    textStyle: 'heading3',
    fontWeight: 500,
    p: '4px 0',
  }),
};

const ButtonContainerStyle = css({
  p: '16px 20px 36px 20px',
  w: 'full',
});
