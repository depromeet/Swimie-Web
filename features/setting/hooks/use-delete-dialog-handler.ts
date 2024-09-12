import { useRouter } from 'next/navigation';

import { useDialog } from '@/hooks';

export function useDeleteDialogHandler() {
  const { dialog, close } = useDialog();
  const router = useRouter();

  // TODO: dim 누르면 단순 close로 route 안되는 점 수정 필요
  const openDeleteModal = () => {
    dialog({
      title: '탈퇴 완료',
      description: `스위미를 이용해주셔서 감사합니다. 나중에 또 만나요!`,
      buttons: {
        confirm: {
          label: '확인',
          onClick: () => {
            close();
            router.push('/login');
          },
        },
      },
      isDim: true,
      onCloseCustom: () => {
        router.push('/login');
      },
    });
  };

  return { openDeleteModal };
}
