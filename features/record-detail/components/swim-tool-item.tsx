import { SwimIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const SwimToolItem = () => {
  return (
    <div className={containerStyle}>
      <div className={iconStyle}>
        <SwimIcon />
      </div>
      <p className={textStyle}>킥판</p>
    </div>
  );
};

const containerStyle = css({
  position: 'relative',
  h: '56px',
  w: '56px',
  backgroundColor: 'fill.normal',
  borderRadius: '4px',
});

const iconStyle = flex({
  position: 'absolute',
  top: '6px',
  justify: 'center',
  w: 'full',
});

const textStyle = css({
  position: 'absolute',
  bottom: '6px',
  width: 'full',
  textStyle: 'caption2',
  fontWeight: 'medium',
  color: 'text.alternative',
  textAlign: 'center',
});
