import { HeaderBar } from '@/components/molecules';
import { NoAlarm } from '@/features/alarm';

//Todo: Api 연결
export default function AlarmPage() {
  return (
    <>
      <HeaderBar>
        <HeaderBar.BackButton />
        <HeaderBar.Title>알림</HeaderBar.Title>
      </HeaderBar>
      <NoAlarm
        mainText="아직 받은 알림이 없어요"
        subText="공지, 활동 소식이 도착하면 알려드릴게요"
      />
    </>
  );
}
