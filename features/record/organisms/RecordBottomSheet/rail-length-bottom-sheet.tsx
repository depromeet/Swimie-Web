import { SelectList } from '@/components/molecules/List';
import { css } from '@/styled-system/css';

import { railLengthOptions } from '../RecordForm';
import { RailLengthBottomSheetProps } from './type';

export function RailLengthBottomSheet({
  isOpen,
  value,
  modifyValue,
  closeBottomSheet,
  addStyles,
}: RailLengthBottomSheetProps) {
  //지영's 바텀 시트로 변경
  return isOpen ? (
    <div className={css(railLengthBottomSheetStyles, addStyles)}>
      <SelectList
        value={value}
        options={railLengthOptions}
        onSelect={modifyValue}
        closeWrapper={closeBottomSheet}
      />
    </div>
  ) : null;
}

const railLengthBottomSheetStyles = css.raw({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'white',
  border: '1.5px solid',
  padding: '15px 0px',
});
