'use client';

import { BottomSheet } from '@/components/molecules';
import {
  DetailDescriptionSection,
  DetailDiarySection,
  DetailPreviewSection,
} from '@/features/record-detail';
import { useBottomSheet } from '@/hooks';
import { flex } from '@/styled-system/patterns';

const RecordDetail = () => {
  const [isOpen, open, close] = useBottomSheet();

  return (
    <article className={containerStyle}>
      {/* preview section */}
      <DetailPreviewSection />
      {/* description section */}
      <DetailDescriptionSection />
      {/* diary section */}
      <DetailDiarySection />

      <button onClick={open}>bottom sheet toggle button</button>
      <BottomSheet
        isOpen={isOpen}
        direction="top"
        onClose={close}
        header={{
          title: 'title test',
          description: 'description',
        }}
      >
        <div style={{ height: 300 }}>hello</div>
      </BottomSheet>
    </article>
  );
};

export default RecordDetail;

const containerStyle = flex({
  flexDirection: 'column',
  gap: '12px',
});
