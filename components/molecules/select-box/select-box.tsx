import { css, cx } from '@/styled-system/css';

export interface SelectBoxProps {
  className?: string;
}

export function SelectBox({ className }: SelectBoxProps) {
  //디자인 확정되면 교체
  return <div className={cx(selectBoxStyles, className)}></div>;
}

const selectBoxStyles = css({
  width: '20vw',
  height: '20vw',
  backgroundColor: 'fill.normal',
  borderRadius: '10px',
});
