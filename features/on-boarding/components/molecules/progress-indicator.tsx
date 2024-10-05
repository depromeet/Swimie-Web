import { OnBoardingImages } from '@/public/images/on-boarding';
import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface ProgressIndicatorProps {
  step: number;
}

export function ProgressIndicator({ step }: ProgressIndicatorProps) {
  return (
    <div className={progressIndicatorStyles}>
      {Array.from({ length: OnBoardingImages.length }, (_, i) => (
        <IndicatorDot key={i} selected={step === i} />
      ))}
    </div>
  );
}

interface IndicatorDotProps {
  selected: boolean;
}

function IndicatorDot({ selected }: IndicatorDotProps) {
  return <div className={css(indicatorDotStyles.raw({ selected }))} />;
}

const progressIndicatorStyles = flex({
  gap: '6px',
});

const indicatorDotStyles = cva({
  base: { display: 'flex', width: '6px', height: '6px', borderRadius: 'full' },
  variants: {
    selected: {
      true: { backgroundColor: 'blue.70' },
      false: { backgroundColor: 'line.neutral' },
    },
  },
});
