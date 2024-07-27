'use client';

import { useSetAtom } from 'jotai';

import { Divider } from '@/components/atoms/divider';
import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { isLaneLengthBottomSheetOpen } from '../store';
const BottomSheetsProvider = dynamic(() => import('./bottom-sheets-provider'), {
  ssr: false,
});
import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';

import { RecordRequestProps } from '../queries/dto';
import { isPoolSearchPageModalOpen } from '../store/page-modal';
import { formSectionStyles } from '../style/form-section';
import { DiarySection } from './diary-section';
import { EquipmentSection } from './equipment-section';
const PageModalsProvider = dynamic(() => import('./page-modals-provider'), {
  ssr: false,
});
import { PhotoSection } from './photo-section';
import { SubInfoSection } from './sub-info-section';

interface SubInfoProps {
  poolName: string | null;
}

export function Form() {
  const methods = useForm<RecordRequestProps & SubInfoProps>({
    defaultValues: {
      poolId: null,
      poolName: null,
      item: null,
      heartRate: null,
      pace: null,
      kcal: null,
      // 달력 클릭하면 넘어오는 날짜를 default로 추후 수정
      recordAt: '2024-07-26',
      startTime: '',
      endTime: '',
      lane: 25,
      diary: null,
      strokes: [],
      imageIdList: [],
    },
  });

  const setIsLaneLengthBottomSheetOpen = useSetAtom(
    isLaneLengthBottomSheetOpen,
  );
  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);
  return (
    //react-hook-form 전역적으로 사용
    <FormProvider {...methods}>
      <form>
        <div className={formSectionStyles}>
          <TextField
            variant="select"
            isRequired
            value="2024년 7월 25일"
            label="수영 날짜"
            wrapperClassName={css({ marginBottom: '24px' })}
          />
          <div className={timeStyles.layout}>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value="18:30"
              placeholder="00:00"
              label="수영 시간"
              wrapperClassName={timeStyles.field}
            />
            <span className={css({ fontSize: '30px' })}>-</span>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value={'19:00'}
              label="수영 시간"
              placeholder="00:00"
              wrapperClassName={timeStyles.field}
            />
          </div>
          <TextField
            variant="select"
            value={
              methods.watch('poolName')
                ? (methods.watch('poolName') as string)
                : ''
            }
            placeholder="(선택)"
            label="수영장"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={() =>
              setIsPoolSearchPageModalOpen({
                isOpen: true,
                jumpDirection: 'forward',
              })
            }
          />
          <TextField
            variant="select"
            value={methods.watch('lane') + 'm'}
            label="레인 길이"
            hasDownArrow
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={() => setIsLaneLengthBottomSheetOpen(true)}
          />
          <TextField
            variant="select"
            value="100m"
            placeholder="거리입력(선택)"
            label="수영 거리"
          />
        </div>
        <Divider variant="thick" />
        <PhotoSection title="오늘의 사진" />
        <Divider variant="thick" />
        <DiarySection title="일기" value="현민 일기" />
        <Divider variant="thick" />
        <EquipmentSection title="장비" />
        <Divider variant="thick" />
        <SubInfoSection title="심박수 · 페이스 · 칼로리" />
        <BottomSheetsProvider />
        <PageModalsProvider />
      </form>
    </FormProvider>
  );
}

const timeStyles = {
  layout: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  field: css({
    width: '42%',
    marginBottom: '24px',
  }),
};
