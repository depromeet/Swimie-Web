'use client';

import { useAtom } from 'jotai';

import { DialogProps } from '@/components/molecules';
import { dialogAtom } from '@/store';

/**
 * @description Dialog를 조작하기 위해 사용합니다.
 *
 * 사용 방법은 아래와 같습니다.
 * 1. components
 * const { dialogState } = useDialog();
 *
 * return <Dialog {...dialogState}>
 *
 * 2. hooks
 * const { dialog, close } = useDialog();
 *
 * const clickOpenDialog = () => {
 *  dialog({
 *    ...options
 *  })
 * }
 */
type DialogOptions = Omit<DialogProps, 'isOpen' | 'onClose'>;
export const useDialog = () => {
  const [dialogState, setDialogState] = useAtom(dialogAtom);

  const dialog = (options: DialogOptions) => {
    setDialogState({
      ...options,
      isOpen: true,
      onClose: close,
    });
  };

  const close = () => {
    setDialogState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return { dialogState, dialog, close } as const;
};
