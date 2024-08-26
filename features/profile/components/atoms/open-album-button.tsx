import { AlbumIcon } from '@/components/atoms';
import { flex } from '@/styled-system/patterns';

interface OpenAlbumButtonProps {
  onClick?: () => void;
}

export function OpenAlbumButton({ onClick }: OpenAlbumButtonProps) {
  return (
    <button className={layoutStyles} onClick={onClick}>
      <AlbumIcon />
    </button>
  );
}

const layoutStyles = flex({
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px',
  borderRadius: 'full',
  backgroundColor: 'blue.90',
});
