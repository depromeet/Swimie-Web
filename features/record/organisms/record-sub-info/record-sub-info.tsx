import { DownArrowIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { RecordSubInfoProps } from './type';

export function RecordSubInfo({ title }: RecordSubInfoProps) {
  return (
    <div className={recordSubInfoStyles}>
      <div className={titleLayoutStyles}>
        <h1 className={titleStyles}>{title}</h1>
        <DownArrowIcon />
      </div>
    </div>
  );
}

const recordSubInfoStyles = css({
  padding: '20px 24px',
});

const titleLayoutStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
});
