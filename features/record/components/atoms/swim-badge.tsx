import { SwimIcon } from '@/components/atoms';
import { cva } from '@/styled-system/css';
import { StrokeName } from '@/types';

type SwimBadge = {
  type: StrokeName;
};
export function SwimBadge({ type }: SwimBadge) {
  return (
    <div className={swimBadgeStyles({ type })}>
      <SwimIcon width={24} height={24} />
    </div>
  );
}

const swimBadgeStyles = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    pb: '2px',
  },
  variants: {
    type: {
      자유형: { backgroundColor: 'primary.swim.자유형.default' },
      배영: { backgroundColor: 'primary.swim.배영.default' },
      접영: { backgroundColor: 'primary.swim.접영.default' },
      평영: { backgroundColor: 'primary.swim.평영.default' },
      킥판: { backgroundColor: 'primary.swim.킥판.default' },
    },
  },
});
