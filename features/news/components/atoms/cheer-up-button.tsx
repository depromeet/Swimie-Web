import { Button } from '@/components/atoms';
import { css } from '@/styled-system/css';

export const CheerUpButton = () => {
  return (
    <Button
      label={'응원 보내기 👏'}
      buttonType="primary"
      className={buttonStyles}
    />
  );
};

const buttonStyles = css({
  mt: '4px',
  w: 'full',
  p: '10px 20px',
  backgroundColor: 'blue.95',
  fontWeight: 'bold',
});
