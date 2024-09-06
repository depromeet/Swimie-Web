import { useDialog } from '@/hooks';

export function useNoticeDialogHandler() {
  const { dialog, close } = useDialog();

  const openNoticeModal = () => {
    dialog({
      title: '개발중입니다.',
      description: '조금만 기다려주세요!',
      buttons: {
        confirm: {
          label: '확인',
          onClick: () => {
            close();
          },
        },
      },
      isDim: true,
    });
  };

  return { openNoticeModal };
}
