import { SelectList } from '@/components/molecules/list';
import { css, cx } from '@/styled-system/css';

import { railLengthOptions } from '../RecordForm';
import { LaneLengthBottomSheetProps } from './type';

export function LaneLengthBottomSheet({
  title,
  isOpen,
  value,
  modifyValue,
  closeBottomSheet,
  className,
}: LaneLengthBottomSheetProps) {
  //지영's 바텀 시트로 변경
  return isOpen ? (
    <div className={cx(railLengthBottomSheetStyles, className)}>
      <h1 className={titleStyles}>{title}</h1>
      <SelectList
        value={value}
        options={railLengthOptions}
        onSelect={modifyValue}
        closeWrapper={closeBottomSheet}
        className={addSelectListStyles}
        listElementClassName={addSelectListElementStyles}
      />
    </div>
  ) : null;
}

const railLengthBottomSheetStyles = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '241px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  border: '1.5px solid',
  borderRadius: '20px 20px 0 0',
  padding: '40px 20px',
});

const titleStyles = css({
  marginBottom: '24px',
});

const addSelectListStyles = css({
  width: '100%',
});

const addSelectListElementStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
});
