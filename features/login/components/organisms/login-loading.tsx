import { LoadingSpinner } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const LoginLoading = () => {
  return (
    <>
      <div className={containerStyle}>
        <LoadingSpinner />
      </div>
      <div className={dimStyle} />
    </>
  );
};

const containerStyle = flex({
  justify: 'center',
  align: 'center',
  width: '120px',
  height: '120px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  translate: 'auto',
  translateX: '-1/2',
  translateY: '-1/2',
  backgroundColor: 'white',
  rounded: '16px',
  zIndex: 1000,
});

const dimStyle = css({
  width: '100%',
  height: '100dvh',
  position: 'fixed',
  top: '50%',
  left: '50%',
  translate: 'auto',
  translateX: '-1/2',
  translateY: '-1/2',
  backgroundColor: 'material.dimmer',
  opacity: '52%',
  zIndex: 900,
  touchAction: 'none',

  '@media (min-width: 600px)': {
    width: '600px',
  },
});
