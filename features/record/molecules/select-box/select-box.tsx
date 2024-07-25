import { css, cx } from '@/styled-system/css';

interface SelectBoxProps {
  className?: string;
}

export function SelectBox({ className }: SelectBoxProps) {
  //디자인 확정되면 교체
  return <div className={cx(layoutStyles, className)}></div>;
}

const layoutStyles = css({
  w: '20vw',
  h: '20vw',
  backgroundColor: 'fill.normal',
  borderRadius: '10px',
});
