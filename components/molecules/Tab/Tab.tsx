import { css } from '@/styled-system/css';

import { TabProps, TabTypeProps } from './type';

/**
 * @param variant fill 고정값 (fit-content는 primary에만 적용)
 * @param type primary 고정값
 */

const tabStyles = {
  primary: {
    width: '375px',
    height: '56px',
    borderBottom: '1px solid',
    borderColor: 'coolNeutral.97',
    padding: '0px 20px',
  },
  secondary: {
    width: '335px',
    height: '44px',
    border: '1px solid coolNeutral.97',
    backgroundColor: 'fill.normal',
    padding: '3px',
    borderRadius: '12px',
  },
  assistive: {
    width: '150px',
    height: '34px',
  },
};

const Tab = ({
  children,
  variant = 'fill',
  type = 'primary',
}: TabProps & TabTypeProps) => {
  const typeStyle = tabStyles[type] || tabStyles.primary;

  const style = {
    ...typeStyle,
    display: 'flex',
    justifyContent: variant === 'fill' ? 'center' : 'flex-start',
    alignItems: 'center',
  };

  const tabStyleClass = css(style);

  return <div className={tabStyleClass}>{children}</div>;
};

export default Tab;
