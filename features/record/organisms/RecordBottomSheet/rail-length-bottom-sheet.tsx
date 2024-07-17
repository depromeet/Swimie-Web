import { SelectList } from '@/components/molecules/List';
import { css } from '@/styled-system/css';

import { railLengthOptions } from '../RecordForm';
import { RailLengthBottomSheetProps } from './type';

export function RailLengthBottomSheet({
  title,
  isOpen,
  value,
  modifyValue,
  closeBottomSheet,
  addStyles,
}: RailLengthBottomSheetProps) {
  //지영's 바텀 시트로 변경
  return isOpen ? (
    <div className={css(railLengthBottomSheetStyles, addStyles)}>
      <h1 className={css(titleStyles)}>{title}</h1>
      <SelectList
        value={value}
        options={railLengthOptions}
        onSelect={modifyValue}
        closeWrapper={closeBottomSheet}
        addStyles={addSelectListStyles}
        addListElementStyles={addSelectListElementStyles}
      />
    </div>
  ) : null;
}

const railLengthBottomSheetStyles = css.raw({
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

const titleStyles = css.raw({
  marginBottom: '24px',
});

const addSelectListStyles = css.raw({
  width: '100%',
});

const addSelectListElementStyles = css.raw({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
});
