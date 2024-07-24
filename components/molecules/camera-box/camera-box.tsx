import { CameraIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';

export interface CameraBoxProps {
  text?: string;
  className?: string;
  onClick: () => void;
}

export function CameraBox({
  text = '사진 업로드',
  className,
  onClick,
}: CameraBoxProps) {
  return (
    <div className={cx(cameraBoxStyles, className)} onClick={onClick}>
      <CameraIcon />
      <span className={textStyles}>{text}</span>
    </div>
  );
}

const cameraBoxStyles = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '126px',
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
