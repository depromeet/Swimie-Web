import { css } from '@/styled-system/css';

type Dim = {
  onClick: () => void;
  zIndex?: 500 | 600 | 700 | 800;
};
/**
 *
 * @description bottomSheet, modal, dialog에서 사용되는 Dim component입니다.
 *
 * @param zIndex Dim의 zIndex value입니다.
 *   BottomSheet - dim: 500 / container: 550
 *   Modal - dim: 700 / container: 750
 *   Dialog - dim: 800 / container: 850
 */
export const Dim = ({ onClick, zIndex = 800 }: Dim) => {
  return (
    <div
      onClick={onClick}
      className={css({
        position: 'fixed',
        inset: '0',
        display: 'block',
        width: '100%',
        maxWidth: 'maxWidth',
        height: '100%',
        margin: '0 auto',
        backgroundColor: 'rgb(0 0 0 / 40%)',
        animation: 'dimFadeIn 0.3s',
      })}
      style={{
        zIndex,
      }}
    />
  );
};
