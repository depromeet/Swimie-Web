'use client';

import { useSetAtom } from 'jotai';

import { NormalShapeIcon } from '@/components/atoms';
import { withdrawalReasonAtom } from '@/store';
import { flex } from '@/styled-system/patterns';

import { ListItem } from '../atom';

interface Step1Props {
  onClickListItem: () => void;
}

export function Step1({ onClickListItem }: Step1Props) {
  const setWithdrawalReason = useSetAtom(withdrawalReasonAtom);

  const withdrawalArr = [
    { text: '더이상 수영을 하지 않아요', reason: 'REASON_01' },
    { text: '오류가 생겨서 쓸 수 없어요', reason: 'REASON_02' },
    { text: '개인정보가 불안해요', reason: 'REASON_03' },
    { text: '앱 사용법을 모르겠어요', reason: 'REASON_04' },
    { text: '기타', reason: 'REASON_05' },
  ];

  const handleItemClick = (reason: string) => {
    setWithdrawalReason(reason);
    onClickListItem();
  };

  return (
    <div>
      <div className={titleStyles}>탈퇴하는 이유가 무엇인가요?</div>
      {withdrawalArr.map(({ text, reason }) => (
        <ListItem
          key={reason}
          text={text}
          onClick={() => handleItemClick(reason)}
        >
          <NormalShapeIcon />
        </ListItem>
      ))}
    </div>
  );
}

const titleStyles = flex({
  padding: '20px 8px 20px 16px',
  direction: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  textStyle: 'heading2',
  fontWeight: '600',
  color: 'text.strong',
});
