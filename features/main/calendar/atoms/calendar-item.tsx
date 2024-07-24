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
  height: 'full',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',

  '& > p': {
    height: '16px',
    textStyle: 'caption2',
    fontWeight: 'medium',
  },
});

/* TODO: 스마트폰 기종, 반응형 화면에 따라 비율에 맞춰 height가 변할 수 있도록 재설정 필요 */
const linkContainer = css({
  width: 'full',
  height: 'calc(60px + (30vw - 80px) / 2)',
  backgroundColor: 'background.gray',
  rounded: '2px',
});
