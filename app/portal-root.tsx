'use client';

import { Portal, ToastDialog } from '@/components/atoms';
import { Dialog } from '@/components/molecules';
import { useDialog } from '@/hooks/use-dialog';

export const PortalRoot = () => {
  const { dialogState } = useDialog();

  return (
    <>
      <Portal>
        <ToastDialog />
      </Portal>
      <Portal>
        <Dialog {...dialogState} />
      </Portal>
    </>
  );
};
