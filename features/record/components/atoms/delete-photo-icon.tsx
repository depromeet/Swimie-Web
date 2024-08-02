import { DeleteIcon } from '@/components/atoms';
import { cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface DeletePhotoIconProps {
  className?: string;
  onClick?: () => void;
}

export function DeletePhotoIcon({ className, onClick }: DeletePhotoIconProps) {
  return (
    <div className={cx(layout, className)} onClick={onClick}>
      <DeleteIcon />
    </div>
  );
}

const layout = flex({
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  backgroundColor: '#FFFFFF',
  borderRadius: '50%',
});
