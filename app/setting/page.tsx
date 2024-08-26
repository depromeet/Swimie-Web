'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingArea } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { NormalShapeIcon } from '@/components/atoms/icons/normal-shape-icon';
import { BackButton, Dialog, HeaderBar } from '@/components/molecules';
import ListItem from '@/features/setting/components/atom/list-item';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { MemberProps } from '../api/member/route';

export interface LogoutProps {
  status: number;
  code: string;
  message: string;
}

export default function Page() {
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { data, isLoading, error } = useQuery<MemberProps>({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await fetch(`/api/member`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      return (await response.json()) as MemberProps;
    },
  });

  const handleGoToLogout = async () => {
    try {
      const response = await fetch(`/api/logout`);
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      await response.json();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToDeleteAccount = () => {
    router.push('/delete-account?step=1');
  };

  // TODO: 관련 페이지 작업 필요
  const handleGoToSetting = () => {
    // console.log('라우팅 경로 지정 필요');
  };

  const handleGoToChangeDistance = () => {
    router.push('/change-distance');
  };

  const openLogoutModal = () => {
    setIsLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  if (isLoading) return <LoadingArea />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton onClickBack={() => router.push('/')} />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>설정</HeaderBar.Title>
      </HeaderBar>
      <ListItem
        text="기록 시각화 기준 거리"
        subText="달력 한 칸에 표시되는 최대 수영 거리"
        distance={`${data?.data.goal.toLocaleString()}m`}
        onClick={handleGoToChangeDistance}
        clickProps={<NormalShapeIcon />}
      />
      <Divider variant="thick" />
      <ListItem
        text="서비스 이용 약관"
        onClick={handleGoToSetting}
        clickProps={<NormalShapeIcon />}
      />
      <ListItem
        text="개인정보 처리방침"
        onClick={handleGoToSetting}
        clickProps={<NormalShapeIcon />}
      />
      <ListItem
        text="오픈소스 라이선스"
        onClick={handleGoToSetting}
        clickProps={<NormalShapeIcon />}
      />
      <Divider variant="thick" />
      <ListItem
        text="로그아웃"
        onClick={openLogoutModal}
        clickProps={<NormalShapeIcon />}
      />
      <ListItem
        text="탈퇴하기"
        onClick={handleGoToDeleteAccount}
        clickProps={<NormalShapeIcon />}
      />
      <Divider variant="thick" />
      <ListItem
        text="스위미팀에게 문의하기"
        onClick={handleGoToSetting}
        clickProps={<NormalShapeIcon />}
      />
      <div className={dividerStyles}>
        <div className={dividerTextStyles}>앱 버전 1.1</div>
      </div>

      {isLogoutDialogOpen && (
        <Dialog
          title="로그아웃 할까요?"
          isOpen={isLogoutDialogOpen}
          onClose={closeLogoutDialog}
          buttons={{
            confirm: {
              text: '네',
              onClick: () => {
                void handleGoToLogout();
              },
            },
            cancel: {
              text: '아니오',
              onClick: closeLogoutDialog,
            },
          }}
          isDim={true}
        />
      )}
    </div>
  );
}

const dividerStyles = flex({
  height: '266px',
  backgroundColor: 'line.alternative',
  fontWeight: '500',
});

const dividerTextStyles = css({
  color: 'text.alternative',
  textStyle: 'body2.normal',
  padding: '20px 16px',
});
