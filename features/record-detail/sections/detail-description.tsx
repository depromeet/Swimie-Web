/* eslint-disable no-extra-boolean-cast */
import { css } from '@/styled-system/css';
import { grid } from '@/styled-system/patterns';
import { getFormatTime } from '@/utils';

import { SwimDescriptionItem } from '../components';
import { type RecordDetailType } from '../types';

export const DetailDescriptionSection = ({
  data,
}: {
  data: RecordDetailType;
}) => {
  const { pool, duration, memoryDetail } = data;

  // NOTE: data type이 number이므로 0일 경우 예외처리를 위해 Boolean 사용
  const heartRate = Boolean(memoryDetail?.heartRate)
    ? `${memoryDetail?.heartRate} bpm`
    : undefined;
  const pace = Boolean(memoryDetail?.paceMinutes)
    ? `${memoryDetail?.paceMinutes}’${memoryDetail?.paceSeconds}’’/100 m`
    : undefined;
  const kcal = Boolean(memoryDetail?.kcal)
    ? `${memoryDetail?.kcal}kcal`
    : undefined;

  return (
    <section className={containerStyle}>
      <div className={infoWrapperStyle}>
        <SwimDescriptionItem title="수영 장소" value={pool?.name} />
        <SwimDescriptionItem
          title="수영 시간"
          value={duration && `${getFormatTime({ timeStr: duration }).minute}분`}
        />
      </div>

      <div className={detailWrapperStyle}>
        <SwimDescriptionItem title="♥️심박수" value={heartRate} />
        <SwimDescriptionItem title="⏱️평균 페이스" value={pace} />
        <SwimDescriptionItem title="🔥칼로리" value={kcal} />
      </div>
    </section>
  );
};

const containerStyle = css({
  backgroundColor: 'white',
});

const infoWrapperStyle = grid({
  p: '20px',
  columns: 2,
});

const detailWrapperStyle = grid({
  p: '20px',
  columns: 3,
});
