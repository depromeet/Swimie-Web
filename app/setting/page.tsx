/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Divider } from '@/components/atoms/divider';
import { BackButton, Dialog, HeaderBar } from '@/components/molecules';
import ListItem from '@/features/setting/components/atom/list-item';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface LogoutProps {
  status: number;
  code: string;
  message: string;
}

export default function Page() {
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleGoToSetting = () => {
    console.log('라우팅 경로 지정 필요');
  };

  const openLogoutModal = () => {
    setIsLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const handleGoToLogout = async () => {
    const response = await fetch(`/api/logout`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    const data = (await response.json()) as LogoutProps;
    router.push('/login');

    return data;
  };

  const handleGoToDeleteAccount = () => {
    router.push('/delete-account?step=1');
  };

  return (
    <div>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>설정</HeaderBar.Title>
      </HeaderBar>
      <ListItem
        text="기록 시각화 기준 거리"
        subText="달력 한 칸에 표시되는 최대 수영 거리"
        distance="1,000m"
      />
      <Divider variant="thick" />
      <ListItem text="서비스 이용 약관" onClick={handleGoToSetting} />
      <ListItem text="개인정보 처리방침" onClick={handleGoToSetting} />
      <ListItem text="오픈소스 라이선스" onClick={handleGoToSetting} />
      <Divider variant="thick" />
      <ListItem text="로그아웃" onClick={openLogoutModal} />
      <ListItem text="탈퇴하기" onClick={handleGoToDeleteAccount} />
      <Divider variant="thick" />
      <ListItem text="스위미팀에게 문의하기" onClick={handleGoToSetting} />
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
              onClick: handleGoToLogout,
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
