import { atom } from 'jotai';

import { PageModalProps } from '@/components/molecules';

const initialState: Pick<PageModalProps, 'isOpen' | 'jumpDirection'> = {
  isOpen: false,
  jumpDirection: 'forward',
};

/**
 * @description 수영 검색 page-modal open 상태 관리 atom
 */
export const isPoolSearchPageModalOpen =
  atom<Pick<PageModalProps, 'isOpen' | 'jumpDirection'>>(initialState);
