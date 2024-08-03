import dynamic from 'next/dynamic';

import { LeftArrowIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';

import { HeaderBarProps } from './type';

const DynamicBackButton = dynamic(
  () => import('./header-back-button').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => (
      <div className={cx(backIconStyles)}>
        <LeftArrowIcon />
      </div>
    ),
  },
);
/**
 * @param className header-bar에 외부 스타일 주입
 * @param arrowClassName left-arrow-icon에 외부 스타일 주입
 * @param children children 요소
 * @param onClickBack 외부에서 뒤로가기 클릭 시 수행할 동작을 직접 선언(default: router.back())
 */
export function HeaderBar({
  className,
  backIconClassName,
  children,
  onClickBack,
  rightContent,
}: HeaderBarProps) {
  return (
    <header className={cx(headerBarStyles, className)}>
      <div className={parentStyles}>
        <DynamicBackButton
          className={cx(backIconStyles, backIconClassName)}
          onClickBack={onClickBack}
        />
        {children}
        {rightContent && <div className={rightAreaStyles}>{rightContent}</div>}
      </div>
    </header>
  );
}

const headerBarStyles = css({
  position: 'sticky',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  minHeight: '44px',
  backgroundColor: 'white',
  zIndex: 200,
});

const parentStyles = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const backIconStyles = css({
  position: 'absolute',
  left: '12px',
});

const rightAreaStyles = css({
  position: 'absolute',
  right: '12px',
});
