import { css } from '@/styled-system/css';

import { ClickTabItemProps } from './type';

/**
 * @param selected 선택 여부
 * @param text 텍스트
 * @param type primary 고정값
 * @param variant fill 고정값 (fit-content는 primary에만 적용)
 * @param onClick
 */

const tabItemStyles = {
  primary: {
    height: '56px',
    padding: '16px 10px',
  },
  secondary: {
    height: '38px',
    padding: '8px 10px',
  },
  assistive: {
    height: '34px',
    padding: '8px 16px',
    border: '1px solid',
    borderRadius: '999px',
    backgroundColor: 'background.white',
    color: 'normal.white',
  },
};

export const TabItem = ({
  selected,
  text,
  onClick,
  type = 'primary',
  variant = 'fill',
}: ClickTabItemProps) => {
  const baseStyle = tabItemStyles[type] || tabItemStyles.primary;

  const selectedStyles = {
    primary: {
      borderBottom: '2px solid',
      borderColor: 'blue.60',
      color: 'text.normal',
    },
    secondary: {
      boxShadow: 'normal',
      backgroundColor: 'background.white',
      borderRadius: '10px',
      color: 'text.normal',
    },
    assistive: {
      backgroundColor: 'coolNeutral.25',
      color: 'background.white',
    },
  };

  const unselectedStyles = {
    primary: {
      borderColor: 'line.normal',
      color: 'text.alternative',
    },
    secondary: {
      color: 'text.alternative',
    },
    assistive: {
      borderColor: 'line.normal',
      color: 'text.alternative',
    },
  };

  const width =
    variant === 'fit-content' ? 'auto' : type === 'assistive' ? '67px' : '100%';

  const style = {
    ...baseStyle,
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    ...(selected ? selectedStyles[type] : unselectedStyles[type]),
  };

  const tabItemStyleClass = css(style);

  return (
    <div className={tabItemStyleClass} onClick={onClick}>
      {text}
    </div>
  );
};
