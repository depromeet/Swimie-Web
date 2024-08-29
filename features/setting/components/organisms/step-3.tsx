import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms';
import { withdrawalReasonAtom, withdrawalTextAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useLogout } from '../../apis';
import { useDeleteAccount } from '../../apis/use-delete-account';
import { usePostWithdrawal } from '../../apis/use-post-withdrawal';
import { DeleteAccountResponse, WithdrawalRequestData } from '../../types';

export function Step3() {
  const router = useRouter();
  const logout = useLogout();
  const withdrawalText = useAtomValue(withdrawalTextAtom);
  const withdrawalReason = useAtomValue(withdrawalReasonAtom);

  const withdrawalMutation = useMutation<
    DeleteAccountResponse,
    Error,
    WithdrawalRequestData
  >({
    mutationFn: usePostWithdrawal,
    onSuccess: (data) => {
      if (data.status === 200) {
        deleteAccountMutation.mutate();
      } else {
        console.error('Withdrawal failed');
      }
    },
    onError: (error) => {
      console.error('Error during withdrawal:', error);
    },
  });

  const deleteAccountMutation = useMutation<DeleteAccountResponse, Error>({
    mutationFn: useDeleteAccount,
    onSuccess: (data) => {
      if (data.status === 200) {
        void logout();
      } else {
        console.error('Account deletion failed');
      }
    },
    onError: (error) => {
      console.error('Error during account deletion:', error);
    },
  });

  const handleGoToSetting = () => {
    router.push('/setting');
  };

  const handleGoToDeleteAccount = () => {
    withdrawalMutation.mutate({
      reasonCode: withdrawalReason,
      feedback: withdrawalText,
    });
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
          onClick={handleGoToDeleteAccount}
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
