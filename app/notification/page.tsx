import dynamic from 'next/dynamic';

import { LeftArrowIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import {
  NoNotification,
  NotificationElementProps,
  NotificationList,
} from '@/features/notification';
const DynamicBackButton = dynamic(
  () => import('@/components/molecules').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => <LeftArrowIcon />,
  },
);

//Todo: 알람 불러오는 Api 연결
export default function AlarmPage() {
  const dummyAlarms: NotificationElementProps[] = [
    {
      id: 0,
      variant: 'follow',
      userName: '김현민',
      time: '10시간 전',
      isFollowing: true,
      isClicked: true,
    },
    {
      id: 1,
      variant: 'follow',
      userName: '허준영',
      time: '15시간 전',
      isFollowing: false,
      isClicked: false,
    },
    {
      id: 2,
      variant: 'cheer',
      userName: '정지영',
      time: '2일 전',
      recordDate: '7월 8일',
      description: '🔥 오늘도 힘내요!',
      isClicked: true,
    },
    {
      id: 3,
      variant: 'follow',
      userName: '황윤',
      time: '4일 전',
      isFollowing: false,
      isClicked: false,
    },
    {
      id: 4,
      variant: 'cheer',
      userName: '신민철',
      time: '1주 전',
      recordDate: '6월 14일',
      description: '🦭 물개세요?',
      isClicked: false,
    },
  ];
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>알림</HeaderBar.Title>
      </HeaderBar>
      {!dummyAlarms ? (
        <NoNotification
          mainText="아직 받은 알림이 없어요"
          subText="공지, 활동 소식이 도착하면 알려드릴게요"
        />
      ) : (
        <NotificationList alarms={dummyAlarms} />
      )}
    </>
  );
}
