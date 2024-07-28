import { atom } from 'jotai';

import { PageModalProps } from '@/components/molecules';

interface PageModalStateProps
  extends Pick<PageModalProps, 'isOpen' | 'jumpDirection'> {}

const initialState: PageModalStateProps = {
  isOpen: false,
  jumpDirection: 'forward',
};

/**
 * @description 수영 검색 page-modal open 상태 관리 atom
 */
export const isPoolSearchPageModalOpen =
  atom<PageModalStateProps>(initialState);
