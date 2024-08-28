import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms';
import { withdrawalReasonAtom, withdrawalTextAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface DeleteAccountProps {
  status: number;
  code: string;
  message: string;
  data: object;
}

export function Step3() {
  const router = useRouter();
  const setWithdrawalText = useAtomValue(withdrawalTextAtom);
  const setWithdrawalReason = useAtomValue(withdrawalReasonAtom);

  // TODO: 탈퇴 api 구현중
  console.log(
    '탈퇴 사유:',
    setWithdrawalText,
    '탈퇴 이유:',
    setWithdrawalReason,
  );

  const handleGoToSetting = () => {
    router.push('/setting');
  };

  const handleGoToDeleteAccount = async () => {
    const response = await fetch(`/api/delete`, {
      method: 'DELETE',
    });
    // TODO: 탈퇴 api 구현중
    console.log(await response.json());
  };

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        <div className={titleStyles}>정말로 탈퇴할까요?</div>
        <div className={descriptionStyles}>
          <li>스위미에 기록한 모든 내용이 삭제돼요.</li>
          <li>탈퇴한 계정은 복구할 수 없어요.</li>
        </div>
      </div>
      <div className={buttonContainerStyles}>
        <Button
          label="아니요"
          buttonType="secondary"
          variant="outlined"
          size="large"
          className={css({ color: 'text.normal', width: '100%' })}
          onClick={handleGoToSetting}
        />
        <Button
          label="탈퇴하기"
          buttonType="primary"
          variant="solid"
          size="large"
          className={css({ backgroundColor: 'status.negative', width: '100%' })}
          onClick={void handleGoToDeleteAccount}
        />
      </div>
    </div>
  );
}

const containerStyles = flex({
  direction: 'column',
  height: 'calc(100vh - 44px)',
});

const contentStyles = flex({
  direction: 'column',
  flexGrow: 1,
  padding: '8px 20px',
  gap: '16px',
});

const titleStyles = css({
  textStyle: 'heading3',
  fontWeight: '600',
  color: 'text.strong',
});

const descriptionStyles = css({
  textStyle: 'heading6',
  color: 'text.neutral',
  fontWeight: '500',
});

const buttonContainerStyles = flex({
  alignItems: 'center',
  gap: '12px',
  padding: '36px 20px',
});
