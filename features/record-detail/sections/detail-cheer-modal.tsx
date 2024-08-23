'use client';

import { useDragScroll, useModal } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useCheerPreviewList } from '../apis';
import { CheerItem, CheerModal } from '../components';
import { RecordDetailType } from '../types';

export const DetailCheerModalSection = ({
  data,
}: {
  data: RecordDetailType;
}) => {
  const { data: cheerPreviewData } = useCheerPreviewList(data.id);

  const {
    isOpen: isOpenModal,
    open: openModal,
    close: closeModal,
  } = useModal();
  const { sliderRef } = useDragScroll();

  const reactions = cheerPreviewData?.reactions || [];
  return (
    <>
      {/* NOTE: 응원 미리보기 목록 */}
      {reactions && Boolean(reactions.length) && (
        <div className={slider.containerStyle} ref={sliderRef}>
          <div className={slider.wrapperStyle}>
            {reactions.map((item) => (
              <CheerItem
                {...item}
                key={item.reactionId}
                onClick={openModal}
                size="small"
              />
            ))}
            {reactions.length > 10 && (
              <button className={slider.entireCheerButton} onClick={openModal}>
                응원 전체보기
              </button>
            )}
          </div>
        </div>
      )}

      {/* NOTE: 응원 모달 */}
      <CheerModal
        memoryId={data.id}
        isMyMemory={Boolean(data.isMyMemory)}
        isOpen={isOpenModal}
        onClose={closeModal}
        title="8월 16일의 응원"
      />
    </>
  );
};

const slider = {
  containerStyle: css({
    overflowX: 'scroll',
    backgroundColor: 'white',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),

  wrapperStyle: flex({
    gap: '10px',
    width: 'max-content',
    backgroundColor: 'white',
    p: '20px 20px 0px',
  }),

  entireCheerButton: css({
    textStyle: 'label1.normal',
    fontWeight: 'medium',
    color: 'background.white',
    backgroundColor: 'text.neutral',
    rounded: '7px',
    p: '7px 12px',
  }),
};
