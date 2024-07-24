import { css } from '@/styled-system/css';

interface CalendarItemProps {
  date: number;
  content?: string;
  distance?: number;
}

export const CalendarItem = ({
  date,
  content,
  distance,
}: CalendarItemProps) => {
  return (
    <li className={itemContainer}>
      <p className={css({ marginBottom: '5px' })}>{date}</p>
      {/* TODO: 이후 상세 기록 페이지로 이동하는 Link 변경 필요 */}
      <div className={linkContainer}>{content && <p>{content}</p>}</div>
      {distance && <p>{distance}</p>}
    </li>
  );
};

const itemContainer = css({
  width: 'full',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',

  '& > p': {
    height: '16px',
    textStyle: 'caption2',
    fontWeight: 'medium',
  },
});

const linkContainer = css({
  width: 'full',
  height: '63px',
  backgroundColor: 'background.gray',
  rounded: '8px',
});
