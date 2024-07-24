import { BottomSheet, SelectList } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { railLengthOptions } from '../record-form';
import { LaneLengthBottomSheetProps } from './type';

export function LaneLengthBottomSheet({
  title,
  isOpen,
  value,
  modifyValue,
  closeBottomSheet,
  className,
}: LaneLengthBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={closeBottomSheet}>
      <div className={cx(railLengthBottomSheetStyles, className)}>
        <h1 className={titleStyles}>{title}</h1>
        <SelectList
          value={value}
          options={railLengthOptions}
          onSelect={modifyValue}
          closeWrapper={closeBottomSheet}
          listElementClassName={addSelectListElementStyles}
        />
      </div>
    </BottomSheet>
  );
}

const railLengthBottomSheetStyles = flex({
  direction: 'column',
  padding: '40px 20px',
});

const titleStyles = css({
  marginBottom: '24px',
});

const addSelectListElementStyles = flex({
  position: 'relative',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  marginBottom: '8px',
});
