import { css } from '@/styled-system/css';

const dimStyle = css({
  position: 'fixed',
  inset: '0',
  zIndex: '800',
  display: 'block',
  width: '100%',
  maxWidth: 'maxWidth',
  height: '100%',
  margin: '0 auto',
  backgroundColor: 'rgb(0 0 0 / 40%)',
  animation: 'dimFadeIn 0.3s',
});

type Dim = {
  onClick: () => void;
};
export const Dim = ({ onClick }: Dim) => {
  return <div className={dimStyle} onClick={onClick} />;
};
