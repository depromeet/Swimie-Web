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

export default function Page() {
  const logout = useLogout();
  const router = useRouter();

  const { data, isLoading, error } = useCurrentMemberInfo();
  const { openLogoutModal } = useLogoutDialogHandler(logout);

  // TODO: 앱 심사를 위해 주석 처리
  // const { openNoticeModal } = useNoticeDialogHandler();

  if (isLoading) {
    return <LoadingArea />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleGoToDeleteAccount = () => {
    router.push('/delete-account?step=1');
  };

  // TODO: 앱 심사를 위해 주석 처리
  // const handleGoToSetting = () => {
  //   openNoticeModal();
  // };

  const handleClickBlocked = () => {
    router.push('/setting/blocked');
  };

  const handleClickTerms = () => {
    router.push('/setting/terms');
  };

  const handleClickPrivacyPolicy = () => {
    router.push('/setting/privacy-policy');
  };

  const handleGoToInquiry = () => {
    window.location.href = 'https://forms.gle/1yz3fcjCt2NEpwd99';
  };

  const handleGoToChangeDistance = () => {
    router.push('/change-distance');
  };

  const listItems = [
    {
      text: '기록 시각화 기준 거리',
      subText: '달력 한 칸에 표시되는 최대 수영 거리',
      distance: `${data?.data.goal.toLocaleString()}m`,
      onClick: handleGoToChangeDistance,
      divider: true,
    },
    { text: '차단한 계정', onClick: handleClickBlocked, divider: true },
    { text: '서비스 이용 약관', onClick: handleClickTerms },
    {
      text: '개인정보 처리방침',
      onClick: handleClickPrivacyPolicy,
      divider: true,
    },
    // TODO: 앱 심사를 위해 주석 처리
    // { text: '오픈소스 라이선스', onClick: handleGoToSetting, divider: true },
    { text: '로그아웃', onClick: openLogoutModal },
    { text: '탈퇴하기', onClick: handleGoToDeleteAccount, divider: true },
    { text: '스위미팀에게 문의하기', onClick: handleGoToInquiry },
  ];

  return (
    <div className={containerStyles}>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton onClickBack={() => router.push('/')} />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>설정</HeaderBar.Title>
      </HeaderBar>

      {listItems.map((item, index) => (
        <div key={index}>
          <ListItem
            text={item.text}
            subText={item.subText}
            distance={item.distance}
            onClick={item.onClick}
          >
            <NormalShapeIcon />
          </ListItem>
          {item.divider && <Divider variant="thick" />}
        </div>
      ))}

      <div className={versionContainerStyles}>
        <div className={versionTextStyles}>앱 버전 1.1</div>
      </div>
    </div>
  );
}

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
});

const versionContainerStyles = css({
  flex: '1',
  backgroundColor: 'line.alternative',
});

const versionTextStyles = css({
  color: 'text.alternative',
  textStyle: 'body2.normal',
  fontWeight: '500',
  padding: '20px 16px',
});
