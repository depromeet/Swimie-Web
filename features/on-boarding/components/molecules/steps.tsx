import { Fragment } from 'react';

import { Image } from '@/components/atoms';
import { OnBoardingImages } from '@/public/images/on-boarding';
import { css } from '@/styled-system/css';

interface StepsProps {
  current: number;
}

export function Steps({ current }: StepsProps) {
  const stepText = [
    {
      total: '캘린더에서 날짜를 클릭하면 수영을 기록할 수 있어요',
      highlight: ['날짜를 클릭'],
    },
    {
      total: '스마트 워치가 없어도 바퀴 수로 거리 기록이 가능해요',
      highlight: ['바퀴 수'],
    },
    {
      total: '기록한 수영 거리에 따라 물결 높이가 달라져요',
      highlight: ['물결 높이'],
    },
    {
      total: '영법별로 기록하면 색으로 구분되어 보여요',
      highlight: ['영법별', '색'],
    },
    {
      total: '캘린더와 타임라인으로 나의 실력 성장을 확인해요',
      highlight: ['캘린더', '타임라인'],
    },
    {
      total: '수영 친구를 팔로우하고 응원을 주고받아요',
      highlight: ['수영 친구를 팔로우'],
    },
  ];

  const highlightTextInString = (text: string, highlightTexts: string[]) => {
    const regex = new RegExp(`(${highlightTexts.join('|')})`, 'g');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      highlightTexts.includes(part) ? (
        <span key={index} className={textStyles.highlight}>
          {part}
        </span>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
  };

  return (
    <>
      <p className={textStyles.total}>
        {highlightTextInString(
          stepText[current].total,
          stepText[current].highlight,
        )}
      </p>
      <Image
        src={OnBoardingImages[current]}
        alt="온보딩 이미지"
        style={{ objectFit: 'cover' }}
      />
    </>
  );
}

const textStyles = {
  total: css({
    textStyle: 'heading3',
    padding: '0 30px',
    fontWeight: 600,
    textAlign: 'center',
    wordBreak: 'keep-all',
    marginBottom: '6px',
  }),
  highlight: css({
    color: 'primary.swim.총거리.default',
  }),
};
