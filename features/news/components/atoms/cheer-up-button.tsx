import { css } from '@/styled-system/css';

export const CheerUpButton = () => {
  return (
    <button className={buttonStyles}>
      <p className={innerTextStyles}>응원 보내기 👏</p>
    </button>
  );
};

const buttonStyles = css({
  mt: '4px',
  w: 'full',
  p: '10px 20px',
  borderRadius: '6px',
  backgroundColor: 'blue.95',
});

const innerTextStyles = css({
  textStyle: 'body2.normal',
  fontWeight: 'bold',
  color: 'primary.swim.총거리.default',
});
