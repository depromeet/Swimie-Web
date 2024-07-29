import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { TabProps } from './type';

/**
 * @param children TabItem
 * @param variant fill 디폴트값 (fit-content는 primary에만 적용)
 * @param type primary 디폴트값
 * @param className 외부에서 import 시 스타일링
 */

export const Tab = ({
  children,
  variant = 'fill',
  type = 'primary',
  className = '',
}: TabProps) => {
  const baseStyles = flex({
    w: 'full',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  const primaryStyles = css({
    height: '56px',
    backgroundColor: 'white',
    borderBottom: '1px solid',
    borderColor: 'line.neutral',
  });

  const secondaryStyles = css({
    height: '44px',
    backgroundColor: 'background.gray',
    borderRadius: '12px',
    padding: '3px',
  });

  const assistiveStyles = css({
    width: '150px',
    height: '34px',
  });

  const fullWidthStyles = css({
    justifyContent: 'center',
  });

  const fitContentStyles = css({
    justifyContent: 'flex-start',
  });

  const typeStylesMap = new Map([
    ['primary', primaryStyles],
    ['secondary', secondaryStyles],
    ['assistive', assistiveStyles],
  ]);

  const variantStylesMap = new Map([
    ['fit-content', fitContentStyles],
    ['fill', fullWidthStyles],
  ]);

  const tabStyles = cx(
    className,
    baseStyles,
    typeStylesMap.get(type),
    variantStylesMap.get(variant),
  );

  return <div className={tabStyles}>{children}</div>;
};
