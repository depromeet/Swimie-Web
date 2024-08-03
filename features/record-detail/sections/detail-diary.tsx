import { Image, SwimIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getFormatDate } from '@/utils';

import { type RecordDetailType } from '../types';

export const DetailDiarySection = ({ data }: { data: RecordDetailType }) => {
  const { images, diary, recordAt } = data;
  const { year, month, day, weekday } = getFormatDate({ dateStr: recordAt });

  return (
    <section className={containerStyle}>
      {/* NOTE: MVP에서는 한장만 표기 */}
      {Boolean(images?.length) && (
        <div className={imageWrapperStyle}>
          <Image
            src={images[0].url}
            alt="기록 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <div className={diaryWrapperStyle}>
        <div className={header.containerStyle}>
          <div className={header.titleWrapperStyle}>
            <SwimIcon width={28} height={28} />
            <h1 className={header.title}>오늘의 수영 일기</h1>
          </div>

          <p
            className={header.date}
          >{`${year}년 ${month}월 ${day}일 ${weekday}`}</p>
        </div>

        <div className={diaryDetailStyle}>{diary}</div>
      </div>
    </section>
  );
};

const containerStyle = flex({
  gap: '12px',
  direction: 'column',
});

const imageWrapperStyle = css({
  position: 'relative',
  boxSizing: 'border-box',
  aspectRatio: '5/6',
  m: '20px',
  backgroundColor: 'white',
  overflow: 'hidden',
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
