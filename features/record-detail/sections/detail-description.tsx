import { css } from '@/styled-system/css';
import { grid } from '@/styled-system/patterns';

import { SwimDescriptionItem } from '../components';

export const DetailDescriptionSection = () => {
  return (
    <section className={containerStyle}>
      <div className={infoWrapperStyle}>
        {new Array(2).fill(0).map((_, index) => (
          <SwimDescriptionItem key={index} />
        ))}
      </div>

      <div className={detailWrapperStyle}>
        {new Array(3).fill(0).map((_, index) => (
          <SwimDescriptionItem key={index} />
        ))}
      </div>
    </section>
  );
};

const containerStyle = css({
  backgroundColor: 'white',
});

const infoWrapperStyle = grid({
  p: '20px',
  columns: 2,
});

const detailWrapperStyle = grid({
  p: '20px',
  columns: 3,
});
