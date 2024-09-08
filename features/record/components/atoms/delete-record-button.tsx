'use client';

import { useRouter } from 'next/navigation';

import { useDialog, useToast } from '@/hooks';
import { css } from '@/styled-system/css';

import { useDeleteMemory } from '../../apis';

interface DeleteRecordButtonProps {
  memoryId: string;
}

export function DeleteRecordButton({ memoryId }: DeleteRecordButtonProps) {
  const router = useRouter();

  const { mutateAsync: deleteMemory } = useDeleteMemory();
  const { dialog, close } = useDialog();
  const { toast } = useToast();

  const handleDeleteMemory = async () => {
    close();
    const deleteMemoryRes = await deleteMemory(memoryId);
    if (deleteMemoryRes.status === 200) {
      toast('기록이 삭제되었습니다.', { type: 'success' });
      router.back();
    } else alert('오류가 발생했습니다');
  };

  const handleDeleteButtonClick = () => {
    dialog({
      title: '기록을 삭제할까요?',
      description: `삭제한 기록은 다시 복구할 수 없어요.`,
      buttons: {
        cancel: {
          label: '닫기',
          onClick: () => close(),
          variant: 'outlined',
          buttonType: 'assistive',
        },
        confirm: {
          label: '삭제하기',
          onClick: () => {
            handleDeleteMemory().catch((error) => {
              console.log(error);
            });
          },
          variant: 'negative',
          buttonType: 'negative',
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
