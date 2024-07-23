import { css } from '@/styled-system/css';

export const CalendarHeader = () => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      <p>24년 7월</p>
      <button>사진 보기</button>
    </div>
  );
};
