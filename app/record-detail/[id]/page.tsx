'use client';

import {
  DetailDescriptionSection,
  DetailDiarySection,
  DetailPreviewSection,
} from '@/features/record-detail';
import { flex } from '@/styled-system/patterns';

const RecordDetail = () => {
  return (
    <article className={containerStyle}>
      {/* preview section */}
      <DetailPreviewSection />
      {/* description section */}
      <DetailDescriptionSection />
      {/* diary section */}
      <DetailDiarySection />
    </article>
  );
};

export default RecordDetail;

const containerStyle = flex({
  flexDirection: 'column',
  gap: '12px',
});
