import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

type SwimDescriptionItem = {
  title: string;
  value?: string;
};
export const SwimDescriptionItem = ({ title, value }: SwimDescriptionItem) => {
  return (
    <div className={containerStyle}>
      <p className={text.sub}>{title}</p>
      <h1 className={text.main}>{value ?? '-'}</h1>
    </div>
  );
};

const containerStyle = flex({
  gap: '4px',
  direction: 'column',
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
