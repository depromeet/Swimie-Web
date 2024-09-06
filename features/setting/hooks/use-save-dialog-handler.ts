import { useRouter } from 'next/navigation';

import { useDialog } from '@/hooks';

export function useSaveDialogHandler() {
  const router = useRouter();
  const { dialog, close } = useDialog();

  const openSaveModal = () => {
    dialog({
      title: '변경한 내용을 저장하지 않고 나갈까요?',
      buttons: {
        confirm: {
          label: '나가기',
          onClick: () => {
            close(), router.push('/setting');
          },
        },
        cancel: {
          label: '취소',
          onClick: close,
        },
      },
      isDim: true,
    });
  };

  return { openSaveModal };
}
