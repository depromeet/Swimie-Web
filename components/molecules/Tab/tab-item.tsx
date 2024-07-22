import { css } from '@/styled-system/css';

import { ClickTabItemProps } from './type';

export const TabItem = ({
  selected,
  text,
  onClick,
  type,
}: ClickTabItemProps) => {
  const tabItemStyles = css({
    width: '100%',
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
        ? '1px solid'
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
            : 'text.normal',
    whiteSpace: 'nowrap',
  });

  return (
    <div className={tabItemStyles} onClick={onClick}>
      {text}
    </div>
  );
};
