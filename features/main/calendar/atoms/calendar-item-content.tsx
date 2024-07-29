import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { flex } from '@/styled-system/patterns';

import { MemoryType, Strokes } from '../molecules/calendar';

interface ItemContentProps {
  type: MemoryType;
  storkes?: Strokes;
  isAchieved?: boolean;
}

export const ItemContent = ({ type }: ItemContentProps) => {
  if (type === 'NORMAL')
    return (
      <div className={wrapperStyles}>
        <div className={normalLayoutStyles}>
          {/* <Image src={swimmerImage} alt="Finished swimming today" /> */}
          <SwimmerIcon />
        </div>
      </div>
    );
  else if (type === 'SINGLE') return <div></div>;
  return <div></div>;
};

const wrapperStyles = flex({
  width: 'full',
  height: 'full',
  alignItems: 'center',
  justifyContent: 'center',
});

const normalLayoutStyles = flex({
  width: '95%',
  aspectRatio: 'auto 3/4',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: '2px',
  backgroundColor: 'blue.90',
});
