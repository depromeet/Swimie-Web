import { css, cx } from '@/styled-system/css';

import { TabProps, TabTypeProps } from './type';

/**
 *
 * @param type primary 디폴트값
 * @param variant fill 디폴트값 (fit-content는 primary에만 적용)
 */

export const Tab = ({ children, variant, type }: TabProps & TabTypeProps) => {
  const tabStyles = css({
    width:
      type === 'primary' ? '375px' : type === 'assistive' ? '150px' : '335px',
    height:
      type === 'primary' ? '56px' : type === 'assistive' ? '34px' : '44px',
    display: 'flex',
    justifyContent: variant === 'fill' ? 'center' : 'left',
    alignItems: 'center',
    gap: '8px',
    backgroundColor:
      type === 'primary'
        ? 'white'
        : type === 'assistive'
          ? ''
          : 'background.gray',
    borderBottom: type === 'primary' ? '1px solid' : '',
    borderColor: type === 'primary' ? 'line.neutral' : '',
    borderRadius: type === 'primary' ? '' : type === 'assistive' ? '' : '12px',
    padding: type === 'primary' ? '' : '3px',
  });

  return <div className={cx(tabStyles)}>{children}</div>;
};
