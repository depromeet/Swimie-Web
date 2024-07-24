import { css, cx } from '@/styled-system/css';

import { TabProps, TabTypeProps } from './type';

/**
 *
 * @param type primary 디폴트값
 * @param variant fill 디폴트값 (fit-content는 primary에만 적용)
 */

export const Tab = ({ children, variant, type }: TabProps & TabTypeProps) => {
  const primaryStyles = css({
    width: '375px',
    height: '56px',
    backgroundColor: 'white',
    borderBottom: '1px solid',
    borderColor: 'line.neutral',
    justifyContent: variant === 'fill' ? 'center' : 'left',
  });

  const assistiveStyles = css({
    width: '150px',
    height: '34px',
  });

  const otherStyles = css({
    width: '335px',
    height: '44px',
    backgroundColor: 'background.gray',
    borderRadius: '12px',
    padding: '3px',
  });

  const commonStyles = css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  const tabStyles = cx(
    commonStyles,
    type === 'primary' && primaryStyles,
    type === 'assistive' && assistiveStyles,
    type !== 'primary' && type !== 'assistive' && otherStyles,
  );

  return <div className={tabStyles}>{children}</div>;
};
