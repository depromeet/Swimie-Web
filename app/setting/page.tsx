'use client';

import { useRouter } from 'next/navigation';

import { LoadingArea } from '@/components/atoms';
import { NormalShapeIcon } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { BackButton, HeaderBar } from '@/components/molecules';
import { useLogout } from '@/features/setting/apis';
import { ListItem } from '@/features/setting/components';
import { useLogoutDialogHandler } from '@/features/setting/hooks/use-logout-dialog-handler';
import { useCurrentMemberInfo } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function Page() {
  const logout = useLogout();
  const router = useRouter();

  const { data, isLoading, error } = useCurrentMemberInfo();
  const { openLogoutModal } = useLogoutDialogHandler(logout);

  if (isLoading) {
    return <LoadingArea />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

  if (isLoading) return <LoadingArea />;
  if (error) return console.log(error);

  return (
    <div>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton onClickBack={() => router.back()} />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>설정</HeaderBar.Title>
      </HeaderBar>
      <ListItem
        text="기록 시각화 기준 거리"
        subText="달력 한 칸에 표시되는 최대 수영 거리"
        distance={`${data?.data.goal.toLocaleString()}m`}
        onClick={handleGoToChangeDistance}
      >
        <NormalShapeIcon />
      </ListItem>
      <Divider variant="thick" />
      <ListItem text="서비스 이용 약관" onClick={handleGoToSetting}>
        <NormalShapeIcon />
      </ListItem>
      <ListItem text="개인정보 처리방침" onClick={handleGoToSetting}>
        <NormalShapeIcon />
      </ListItem>
      <ListItem text="오픈소스 라이선스" onClick={handleGoToSetting}>
        <NormalShapeIcon />
      </ListItem>
      <Divider variant="thick" />
      <ListItem text="로그아웃" onClick={openLogoutModal}>
        <NormalShapeIcon />
      </ListItem>
      <ListItem text="탈퇴하기" onClick={handleGoToDeleteAccount}>
        <NormalShapeIcon />
      </ListItem>
      <Divider variant="thick" />
      <ListItem text="스위미팀에게 문의하기" onClick={handleGoToSetting}>
        <NormalShapeIcon />
      </ListItem>

      <div className={dividerStyles}>
        <div className={dividerTextStyles}>앱 버전 1.1</div>
      </div>
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
