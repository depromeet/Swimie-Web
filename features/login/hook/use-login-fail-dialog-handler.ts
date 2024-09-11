import { useDialog } from '@/hooks';

export function useLoginFailDialogHandler() {
  const { dialog, close } = useDialog();

  const openFailModal = () => {
    dialog({
      title: 'Apple ID 인증이 필요해요.',
      description:
        '애플 로그인 시 Face ID 또는 비밀번호를 사용해 로그인을 완료해 주세요.',
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

  return { openFailModal };
}
