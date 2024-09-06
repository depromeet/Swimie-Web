import { useDialog } from '@/hooks';
import { css } from '@/styled-system/css';

export function DeleteRecordButton() {
  const { dialog, close } = useDialog();

  const handleDeleteButtonClick = () => {
    dialog({
      title: '기록을 삭제할까요?',
      description: `삭제한 기록은 다시 복구할 수 없어요.`,
      buttons: {
        cancel: {
          text: '닫기',
          onClick: () => close(),
        },
        //삭제 api 연결
        confirm: {
          text: '삭제하기',
          onClick: () => close(),
        },
      },
      isDim: true,
    });
  };
  return (
    <button className={buttonStyles} onClick={handleDeleteButtonClick}>
      삭제
    </button>
  );
}

const buttonStyles = css({
  textStyle: 'body2.normal',
  color: 'status.negative',
  fontWeight: 500,
});
