import { atom } from 'jotai';

import { DialogProps } from '@/components/molecules';

const initialState: DialogProps = {
  isOpen: false,
  onClose: () => {},
  title: '',
};

/**
 * @description dialog state store
 */
export const dialogAtom = atom<DialogProps>(initialState);
