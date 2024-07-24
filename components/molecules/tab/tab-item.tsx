import { css, cx } from '@/styled-system/css';

import { ClickTabItemProps } from './type';

/**
 *
 * @param selected 선택 여부
 * @param text 텍스트
 * @param onClick tab 클릭 시 함수
 * @param type primary 디폴트값
 * @param variant fill 디폴트값 (fit-content는 primary에만 적용)
 */

export const TabItem = ({
  selected,
  text,
  onClick,
  type,
  variant,
}: ClickTabItemProps) => {
  const baseStyles = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  });

  const primaryStyles = css({
    height: '56px',
    padding: '16px 10px',
    backgroundColor: selected ? 'white' : '',
    borderBottom: selected ? '2px solid' : '',
    borderColor: selected ? 'blue.60' : '',
    color: selected ? 'text.normal' : 'text.alternative',
    fontSize: '17px',
  });

  const secondaryStyles = css({
    height: '38px',
    padding: '8px 10px',
    backgroundColor: selected ? 'white' : '',
    borderRadius: selected ? '10px' : '',
    shadow: selected ? 'normal' : '',
    color: selected ? 'text.normal' : 'text.alternative',
    fontSize: '15px',
  });

  const assistiveStyles = css({
    width: '67px',
    height: '38px',
    padding: '8px 10px',
    backgroundColor: selected ? 'coolNeutral.25' : '',
    border: '1px solid',
    borderColor: 'line.normal',
    borderRadius: '999px',
    color: selected ? 'background.white' : 'text.alternative',
    fontSize: '13px',
  });

  const fitContentStyles = css({
    width: 'auto',
  });

  const fullWidthStyles = css({
    width: '100%',
  });

  const tabItemStyles = cx(
    baseStyles,
    type === 'primary' && primaryStyles,
    type === 'secondary' && secondaryStyles,
    type === 'assistive' && assistiveStyles,
    variant === 'fit-content' ? fitContentStyles : fullWidthStyles,
  );

  return (
    <div className={tabItemStyles} onClick={onClick}>
      {text}
    </div>
  );
};
