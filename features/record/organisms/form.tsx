'use client';

import { Divider } from '@/components/atoms/divider';
import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { DiarySection } from './diary-section';
import { PhotoSection } from './photo-section';
import { sectionStyles } from './style';

export function Form() {
  return (
    <form>
      <div className={sectionStyles}>
        <TextField
          variant="select"
          isRequired
          value="2024년 7월 25일"
          label="수영 날짜"
          wrapperClassName={css({ marginBottom: '24px' })}
        />
        <div className={timeStyles.layout}>
          <TextField
            variant="select"
            isRequired
            hasDownArrow
            value="18:30"
            placeholder="00:00"
            label="수영 시간"
            wrapperClassName={timeStyles.field}
          />
          <span className={css({ fontSize: '30px' })}>-</span>
          <TextField
            variant="select"
            isRequired
            hasDownArrow
            value={'19:00'}
            label="수영 시간"
            placeholder="00:00"
            wrapperClassName={timeStyles.field}
          />
        </div>
        <TextField
          variant="select"
          value="현민 수영장"
          placeholder="(선택)"
          label="수영장"
          wrapperClassName={css({ marginBottom: '24px' })}
        />
        <TextField
          variant="select"
          value="25m"
          label="레일 길이"
          hasDownArrow
          wrapperClassName={css({ marginBottom: '24px' })}
        />
        <TextField
          variant="select"
          value="100m"
          placeholder="거리입력(선택)"
          label="수영 거리"
        />
      </div>
      <Divider variant="thick" />
      <PhotoSection title="오늘의 사진" />
      <Divider variant="thick" />
      <DiarySection title="일기" value="현민 일기" />
    </form>
  );
}

const timeStyles = {
  layout: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  field: css({
    width: '42%',
    marginBottom: '24px',
  }),
};
