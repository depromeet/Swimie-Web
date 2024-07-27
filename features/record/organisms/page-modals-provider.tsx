import { Portal } from '@/components/atoms';

import { PoolSearchPageModal } from './pool-search-page-modal';

//수영 기록 form에 사용되는 Page-Modal들 추가
export default function PageModalsProvider() {
  return (
    <Portal>
      <PoolSearchPageModal title="어디서 수영했나요?" />
    </Portal>
  );
}
