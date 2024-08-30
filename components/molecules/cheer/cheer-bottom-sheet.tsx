import { Button } from '@/components/atoms';
import { BottomSheet, BottomSheetProps } from '@/components/molecules';
import { DetailCheerItemSelected } from '@/features/record-detail';
import { usePreventBodyScroll } from '@/hooks';
import { flex, grid } from '@/styled-system/patterns';

import { CheerItem } from './cheer-item';

type CheerBottomSheet = {
  cheerList: DetailCheerItemSelected[];
  onClickCheerItem: (index: number) => void;
  onClickSendCheer: () => void;
} & BottomSheetProps;
export const CheerBottomSheet = ({
  header,
  isOpen,
  onClose,
  cheerList,
  onClickCheerItem,
  onClickSendCheer,
}: CheerBottomSheet) => {
  usePreventBodyScroll({ isOpen });

  return (
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
  );
};

const tagContainerStyle = flex({
  wrap: 'wrap',
  gap: '10px',
  rowGap: '10px',
  p: '8px 20px',
});

const buttonContainerStyle = grid({
  gap: '10px',
  p: '16px 20px 0 20px',
  gridTemplateColumns: '1fr 1fr',
});
