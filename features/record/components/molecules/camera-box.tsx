import { CameraIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface CameraBoxProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

export function CameraBox({
  text = '사진 업로드',
  className,
  onClick,
}: CameraBoxProps) {
  return (
    <div className={cx(layoutStyles, className)} onClick={onClick}>
      <CameraIcon />
      <span className={textStyles}>{text}</span>
    </div>
  );
}

const layoutStyles = flex({
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  w: 'full',
  h: '126px',
  borderRadius: '10px',
  border: '1px solid',
  borderColor: 'line.normal',
});

const textStyles = css({
  marginTop: '4px',
  textStyle: 'label2',
  color: 'text.alternative',
  fontWeight: '500',
});
