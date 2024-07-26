import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface SubInfoTextFieldsProps {
  isOpen: boolean;
}

export function SubInfoTextFields({ isOpen }: SubInfoTextFieldsProps) {
  return isOpen ? (
    <div className={layoutStyles}>
      <TextField
        label="심박수"
        unit="BPM"
        wrapperClassName={css({ marginBottom: '23px' })}
      />
      <TextField
        label="페이스"
        unit="/100m"
        wrapperClassName={css({ marginBottom: '23px' })}
      />
      <TextField label="칼로리" unit="Kcal" />
    </div>
  ) : null;
}

const layoutStyles = css({
  padding: '0 20px 24px 20px',
});
