'use client';

import { BottomSheet } from '@/components/molecules';
import { useBottomSheet } from '@/hooks';

const RecordDetail = () => {
  const [isOpen, open, close] = useBottomSheet();

  return (
    <article>
      {/* preview section */}
      <section>Preview</section>
      {/* description section */}
      <section>Description</section>
      {/* detail section */}
      <section>record - detail</section>

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
