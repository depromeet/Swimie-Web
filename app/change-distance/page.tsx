'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoadingArea } from '@/components/atoms';
import { BackButton, Dialog, HeaderBar } from '@/components/molecules';
import SettingCalendar from '@/features/setting/components/organisms/setting-calendar';

import { MemberProps } from '../api/member/route';

export default function Page() {
  const fetchIdData = async (): Promise<MemberProps> => {
    const response = await fetch(`/api/member`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    return (await response.json()) as MemberProps;
  };

  const { data, error } = useQuery<MemberProps>({
    queryKey: ['data'],
    queryFn: fetchIdData,
  });

  const router = useRouter();

  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setSelectedDistance(data.data.goal);
    }
  }, [data?.data.goal]);

  if (!data) return <LoadingArea />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleDistanceChange = (distance: number) => {
    setSelectedDistance(distance);
  };

  const backButton = () => {
    if (data.data.goal !== selectedDistance) {
      setIsLogoutDialogOpen(true);
    } else {
      router.push('/setting');
    }
  };

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const handleNavigateWithoutSaving = () => {
    setIsLogoutDialogOpen(false);
    router.push('/setting');
  };

  return (
    <div>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton onClickBack={backButton} />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>기록 시각화 기준 거리</HeaderBar.Title>
      </HeaderBar>
      <SettingCalendar
        goal={data.data.goal}
        selectedDistance={selectedDistance}
        onDistanceChange={handleDistanceChange}
      />
      {isLogoutDialogOpen && (
        <Dialog
          title="변경한 내용을 저장하지 않고 나갈까요?"
          isOpen={isLogoutDialogOpen}
          onClose={closeLogoutDialog}
          buttons={{
            confirm: {
              text: '취소',
              onClick: closeLogoutDialog,
            },
            cancel: {
              text: '나가기',
              onClick: handleNavigateWithoutSaving,
            },
          }}
          isDim={true}
        />
      )}
    </div>
  );
}
