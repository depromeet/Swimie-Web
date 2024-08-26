import { atom } from 'jotai';

import { ToastProps } from '@/components/atoms';

/**
 * @description dialog state store
 */
export const toastAtom = atom<Map<string, ToastProps>>(
  new Map<string, ToastProps>(),
);
