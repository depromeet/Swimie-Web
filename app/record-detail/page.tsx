'use client';

import { BottomSheet } from '@/components/molecules';
import {
  DetailDescriptionSection,
  DetailDiarySection,
  DetailPreviewSection,
} from '@/features/record-detail';
import { useBottomSheet } from '@/hooks';

const RecordDetail = () => {
  const [isOpen, open, close] = useBottomSheet();

  return (
    <article>
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
