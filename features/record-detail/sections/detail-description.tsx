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
  const { minute: durationMinute } = getFormatTime({ timeStr: duration });

  return (
    <section className={containerStyle}>
      <div className={infoWrapperStyle}>
        <SwimDescriptionItem title="수영 장소" value={pool?.name} />
        <SwimDescriptionItem title="수영 시간" value={`${durationMinute}분`} />
      </div>

      <div className={detailWrapperStyle}>
        <SwimDescriptionItem
          title="♥️심박수"
          value={`${memoryDetail?.heartRate} bpm`}
        />
        <SwimDescriptionItem
          title="⏱️평균 페이스"
          value={`${memoryDetail?.paceMinutes}’${memoryDetail?.paceSeconds}’’/100 m`}
        />
        <SwimDescriptionItem
          title="🔥칼로리"
          value={`${memoryDetail?.kcal}kcal`}
        />
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
