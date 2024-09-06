'use client';

import { useState } from 'react';

import { Button, CheckIcon } from '@/components/atoms';
import { BottomSheet, BottomSheetProps } from '@/components/molecules';
import { useToast } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useReport } from '../apis';
import { ReasonCode } from '../types';

type Report = {
  text: string;
  code: ReasonCode;
};
const REPORT_LIST: Report[] = [
  { text: '스팸, 광고', code: 'REPORT_REASON_1' },
  { text: '폭력적인 발언', code: 'REPORT_REASON_2' },
  { text: '음란성, 선정성 내용', code: 'REPORT_REASON_3' },
  { text: '개인정보 노출', code: 'REPORT_REASON_4' },
  { text: '수영과 무관한 내용', code: 'REPORT_REASON_5' },
];

type ReportItem = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
};
const ReportItem = ({ text, isSelected, onClick }: ReportItem) => {
  return (
    <li onClick={onClick} className={ItemStyle}>
      <p>{text}</p>
      {isSelected && <CheckIcon />}
    </li>
  );
};

type ReportBottomSheet = {
  memoryId: string;
} & BottomSheetProps;
export const ReportBottomSheet = ({
  isOpen,
  onClose,
  memoryId,
}: ReportBottomSheet) => {
  const { toast } = useToast();
  const { mutate: mutateReport, isPending } = useReport();
  const [selectedReportItem, setSelectedReportItem] = useState<Report>();

  const handleClickReport = () => {
    if (!selectedReportItem) return;

    mutateReport(
      { memoryId: Number(memoryId), reasonCode: selectedReportItem?.code },
      {
        onSuccess: () => {
          onClose();
          toast('신고가 접수되었어요', { type: 'success' });
        },
      },
    );
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      header={{
        title: '신고 사유를 선택해주세요',
        description:
          '누적 신고횟수가 3회 이상인 유저는 기록을 할 수 없어요. 신고 검토까지 최대 24시간이 걸려요. ',
      }}
    >
      <div className={ContainerStyle}>
        <ul className={ContentWrapperStyle}>
          {REPORT_LIST.map((item, index) => (
            <ReportItem
              key={index}
              text={item.text}
              isSelected={item.code === selectedReportItem?.code}
              onClick={() => setSelectedReportItem(item)}
            />
          ))}
        </ul>
        <Button
          label="확인"
          variant="solid"
          buttonType="primary"
          disabled={!selectedReportItem}
          onClick={handleClickReport}
          isLoading={isPending}
        />
      </div>
    </BottomSheet>
  );
};

const ContainerStyle = flex({
  direction: 'column',
  p: '0 20px',

  '& > button': {
    mt: '16px',
  },
});

const ContentWrapperStyle = flex({
  direction: 'column',
});

const ItemStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textStyle: 'heading6',
  fontWeight: 'medium',
  color: 'text.normal',
  cursor: 'pointer',
  height: '48px',
});
