import { Modal, ModalProps } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { CheerModalItem } from './cheer-modal-item';

const initialCheerList = [
  {
    reactionId: 32,
    emoji: '🔥',
    comment: '오늘도 힘내요!',
    nickname: '이승은',
    profileImageUrl: '',
  },
  {
    reactionId: 31,
    emoji: '🦭',
    comment: '물개세요?',
    nickname: '준영',
    profileImageUrl: '',
  },
  {
    reactionId: 30,
    emoji: '🎯',
    comment: '목표 달성!',
    nickname: '최유영',
    profileImageUrl: '',
  },
  {
    reactionId: 29,
    emoji: '👏🏼',
    nickname: '신민철',
    profileImageUrl: '',
  },
];

// TODO: data 연동 및 props 수정
type CheerModal = {
  cheerList?: string[];
} & ModalProps;
export const CheerModal = ({
  isOpen,
  onClose,
  title,
  description,
}: CheerModal) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      button={{
        text: '닫기',
        onClick: onClose,
      }}
      isBodyFadeOut={true}
    >
      <div className={contentWrapper}>
        {initialCheerList.map((item) => (
          <CheerModalItem {...item} key={item.reactionId} />
        ))}
      </div>
    </Modal>
  );
};

const contentWrapper = css({
  flexGrow: 1,
  height: 'full',
  maxHeight: '332px',
  overflowY: 'scroll',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
