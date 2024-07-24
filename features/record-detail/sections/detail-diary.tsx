import { SwimIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const DetailDiarySection = () => {
  return (
    <section className={containerStyle}>
      <div className={imageWrapperStyle}>대충 여긴 이미지..</div>

      <div className={diaryWrapperStyle}>
        <div className={header.containerStyle}>
          <div className={header.titleWrapperStyle}>
            <SwimIcon width={28} height={28} />
            <h1 className={header.title}>오늘의 수영 일기</h1>
          </div>
          <p className={header.date}>24년 7월 25일 목</p>
        </div>

        <div className={diaryDetailStyle}>대충 여기는 일기 내용..</div>
      </div>
    </section>
  );
};

const containerStyle = flex({
  gap: '12px',
  flexDirection: 'column',
});

const imageWrapperStyle = css({
  p: '20px',
  backgroundColor: 'white',
});

const diaryWrapperStyle = css({
  p: '28px 20px',
  backgroundColor: 'white',
});

const header = {
  containerStyle: flex({
    justify: 'space-between',
    align: 'center',
  }),
  titleWrapperStyle: flex({
    gap: '6px',
    align: 'center',
  }),
  title: css({
    textStyle: 'heading5',
    fontWeight: 'bold',
    color: 'text.normal',
  }),
  date: css({
    textStyle: 'caption1',
    fontWeight: 'medium',
    color: 'text.alternative',
  }),
};

const diaryDetailStyle = css({
  mt: '12px',
  mb: '8px',
  p: '20px',
  borderRadius: '4px',
  textStyle: 'body2.leading',
  color: 'text.neutral',
  backgroundColor: 'background.gray',
});
