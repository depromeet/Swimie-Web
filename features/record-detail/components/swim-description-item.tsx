import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const SwimDescriptionItem = () => {
  return (
    <div className={containerStyle}>
      <p className={text.sub}>수영 장소</p>
      <h1 className={text.main}>충무스포츠센터</h1>
    </div>
  );
};

const containerStyle = flex({
  gap: '4px',
  flexDirection: 'column',
});

const text = {
  sub: css({
    textStyle: 'caption1',
    color: 'text.alternative',
    fontWeight: 'medium',
  }),

  main: css({
    textStyle: 'heading5',
    color: 'text.normal',
    fontWeight: 'bold',
  }),
};
