import { css, cx } from '@/styled-system/css';

interface CalendarItemProps {
  date: number;
  content?: string;
  distance?: number;
  isToday: boolean;
}

export const CalendarItem = ({
  date,
  content,
  distance,
  isToday,
}: CalendarItemProps) => {
  return (
    <li className={itemContainer}>
      <p
        className={cx(
          DateStyles,
          isToday === true ? TodayDateStyles : EmptyStyles,
        )}
      >
        {date}
      </p>
      {/* TODO: 이후 상세 기록 페이지로 이동하는 Link 변경 필요 */}
      <div className={linkContainer}>{content && <p>{content}</p>}</div>
      <p>{distance}</p>
    </li>
  );
};

const itemContainer = css({
  width: 'full',
  height: 'full',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',

  '& > p': {
    height: '15px',
    textStyle: 'caption2',
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

const DateStyles = css({
  padding: '1px',
  marginBottom: '5px',
  borderRadius: 'full',
});

const EmptyStyles = '';

const TodayDateStyles = css({
  backgroundColor: 'blue.60',
  color: 'white',
});

/* TODO: 스마트폰 기종, 반응형 화면에 따라 비율에 맞춰 height가 변할 수 있도록 재설정 필요 */
const linkContainer = css({
  width: 'full',
  height: 'calc(60px + (30vw - 80px) / 2)',
  maxHeight: '120px',
  backgroundColor: 'background.gray',
  rounded: '2px',
});
