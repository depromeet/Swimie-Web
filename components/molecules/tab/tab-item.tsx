import { css } from '@/styled-system/css';

import { ClickTabItemProps } from './type';

/**
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
  const tabItemStyles = css({
    width:
      variant === 'fit-content'
        ? 'auto'
        : type === 'assistive'
          ? '67px'
          : '100%',
    height: type === 'primary' ? '56px' : '38px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding: type === 'primary' ? '16px 10px' : '8px 10px',
    backgroundColor:
      type === 'primary' && selected
        ? 'white'
        : type === 'secondary' && selected
          ? 'white'
          : type === 'assistive' && selected
            ? 'coolNeutral.25'
            : '',
    borderBottom:
      type === 'primary' && selected
        ? '2px solid'
        : type === 'secondary' && selected
          ? ''
          : '',
    border: type === 'assistive' ? '1px solid' : '',
    borderColor:
      type === 'primary' && selected
        ? 'blue.60'
        : type === 'secondary' && selected
          ? ''
          : 'line.normal',
    borderRadius:
      type === 'primary' && selected
        ? ''
        : type === 'secondary' && selected
          ? '10px'
          : type === 'assistive'
            ? '999px'
            : '',
    shadow:
      type === 'primary' && selected
        ? ''
        : type === 'secondary' && selected
          ? 'normal'
          : '',
    color:
      type === 'primary' && selected
        ? 'text.normal'
        : type === 'secondary' && selected
          ? 'text.normal'
          : type === 'assistive' && selected
            ? 'background.white'
            : 'text.alternative',
    fontSize:
      type === 'primary' ? '17px' : type === 'secondary' ? '15px' : '13px',
  });

  return (
    <div className={tabItemStyles} onClick={onClick}>
      {text}
    </div>
  );
};
