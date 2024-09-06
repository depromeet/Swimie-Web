/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from 'next/navigation';

import { useDialog } from '@/hooks';

export function useLogoutDialogHandler(logout: () => Promise<void>) {
  const { dialog, close } = useDialog();
  const router = useRouter();

  const openLogoutModal = () => {
    dialog({
      title: '로그아웃 할까요?',
      buttons: {
        confirm: {
          label: '네',
          onClick: async () => {
            try {
              await logout();
              close();
              router.push('/login');
            } catch (error) {
              console.error('Logout failed', error);
            }
          },
        },
        cancel: {
          label: '아니오',
          onClick: close,
        },
      },
      isDim: true,
    });
  };

  return { openLogoutModal };
}
