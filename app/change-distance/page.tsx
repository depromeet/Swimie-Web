'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoadingArea } from '@/components/atoms';
import { BackButton, HeaderBar } from '@/components/molecules';
import { useMemberData } from '@/features/setting/apis';
import { SettingCalendar } from '@/features/setting/components';
import { useSaveDialogHandler } from '@/features/setting/hooks';

export default function Page() {
  const router = useRouter();
  const { data, error } = useMemberData();
  const { openSaveModal } = useSaveDialogHandler();

  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setSelectedDistance(data.data.goal);
    }
  }, [data]);

  if (!data) return <LoadingArea />;
  if (error) return console.log(error);

  const handleDistanceChange = (distance: number) => {
    setSelectedDistance(distance);
  };

  const backButton = () => {
    if (data.data.goal !== selectedDistance) {
      openSaveModal();
    } else {
      router.push('/setting');
    }
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
    </div>
  );
}
