import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface ListItemTextProps {
  text: string;
  subText?: string;
  distance?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function ListItem({
  text,
  subText,
  distance,
  onClick,
  children,
}: ListItemTextProps) {
  return (
    <div className={listItemStyles} onClick={onClick}>
      <div>
        <div className={listItemTextStyles}>{text}</div>
        <div className={listItemSubTextStyles}>{subText}</div>
      </div>
      <div className={listItemRightStyles}>
        <div className={listItemDistanceStyles}>{distance}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

const listItemStyles = flex({
  padding: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  backgroundColor: 'background.white',
  cursor: 'pointer',
});

const listItemTextStyles = css({
  color: 'text.normal',
  textStyle: 'heading6',
  fontWeight: '500',
});

const listItemSubTextStyles = css({
  color: 'text.alternative',
  textStyle: 'label2',
});

const listItemRightStyles = flex({
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
});

const listItemDistanceStyles = css({
  color: 'text.alternative',
  textStyle: 'heading6',
});
