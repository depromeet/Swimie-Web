'use client';

import { Portal } from '@/components/atoms';
import { Dialog } from '@/components/molecules';
import { useDialog } from '@/hooks/use-dialog';

export const PortalRoot = () => {
  const { dialogState } = useDialog();

  return (
    <Portal>
      <Dialog {...dialogState} />
    </Portal>
  );
};
