import { Image } from '@/components/atoms';
import { SwimToolImages, SwimToolName } from '@/public/images/swim-tools';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

type SwimToolItem = {
  name: SwimToolName;
};
export const SwimToolItem = ({ name }: SwimToolItem) => {
  return (
    <div className={containerStyle}>
      <div className={iconStyle}>
        <Image src={SwimToolImages[name]} alt={name} width={32} height={32} />
      </div>
      <p className={textStyle}>{name}</p>
    </div>
  );
};

const containerStyle = css({
  position: 'relative',
  h: '60px',
  w: '60px',
  backgroundColor: 'fill.normal',
  borderRadius: '4px',
});

const iconStyle = flex({
  position: 'absolute',
  top: '8px',
  justify: 'center',
  w: 'full',
});

const textStyle = css({
  position: 'absolute',
  bottom: '7px',
  width: 'full',
  textStyle: 'caption2',
  fontWeight: 'medium',
  color: 'text.alternative',
  textAlign: 'center',
});
