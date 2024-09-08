'use client';

import { useRouter } from 'next/navigation';

import { useCurrentMemberInfo, useDialog, useToast } from '@/hooks';

import { useBlockMember } from './use-block-member';
import { useProfileData } from './use-profile-data';

export interface blockMemberInfoProps {
  nickname: string;
  memberId: number;
}

export function useBlockDialogHandler({
  nickname,
  memberId,
}: blockMemberInfoProps) {
  const { dialog, close } = useDialog();
  const { blockMember } = useBlockMember(memberId);
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useCurrentMemberInfo();
  const { refetch } = useProfileData(data?.data.id);

  const openBlockModal = () => {
    dialog({
      title: `${nickname}님을 차단할까요?`,
      description: `앞으로 ${nickname}님의 기록을 볼 수 없고, ${nickname}님도 내 기록을 볼 수 없어요.`,
      buttons: {
        cancel: {
          label: '닫기',
          onClick: () => {
            close();
          },
          buttonType: 'assistive',
        },
        confirm: {
          label: '차단하기',
          onClick: () => {
            void (async () => {
              try {
                await blockMember();
                void refetch();
                close();
                toast(`${nickname}님을 차단했어요.`, { type: 'success' });
                router.push('/');
              } catch (error) {
                console.error('Failed to block member:', error);
                toast('차단하는 중 오류가 발생했습니다.', { type: 'error' });
              }
            })();
          },
          buttonType: 'negative',
          variant: 'negative',
        },
      },
      isDim: true,
    });
  };

  return { openBlockModal };
}
