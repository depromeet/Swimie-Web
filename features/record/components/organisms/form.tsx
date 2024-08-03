/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useImagePresignedUrl, useMemory, usePullMemory } from '../../apis';
import { RecordRequestProps } from '../../apis/dto';
import {
  isDistancePageModalOpen,
  isLaneLengthBottomSheetOpen,
  isPoolSearchPageModalOpen,
  timeBottomSheetState,
} from '../../store';
import { formSubInfoState } from '../../store/form-sub-info';
import { formSectionStyles } from '../../styles/form-section';
import { DiarySection } from './diary-section';
import { DistancePageModal } from './distance-page-modal';
import { EquipmentSection } from './equipment-section';
import { LaneLengthBottomSheet } from './lane-length-bottom-sheet';
import { PhotoSection } from './photo-section';
import { PoolSearchPageModal } from './pool-search-page-modal';
import { SubInfoSection } from './sub-info-section';
import { TimeBottomSheet } from './time-bottom-sheet';

//Todo: null 타입 제거
//Todo: watch의 성능 이슈 고민
export function Form() {
  const searchParams = useSearchParams();
  const { data } = usePullMemory(Number(searchParams.get('memoryId')));
  const methods = useForm<RecordRequestProps>({
    defaultValues: {
      // 달력 클릭하면 넘어오는 날짜를 default로 추후 수정
      recordAt: '2024-07-10',
      startTime: '',
      endTime: '',
      lane: 25,
      strokes: [],
      imageIdList: [],
    },
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        recordAt: data.data.recordAt,
        startTime: data.data.startTime,
        endTime: data.data.endTime,
        lane: data.data.lane,
        diary: data.data.diary,
        heartRate: data.data.memoryDetail.heartRate,
        kcal: data.data.memoryDetail.kcal,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const router = useRouter();
  const setIsLaneLengthBottomSheetOpen = useSetAtom(
    isLaneLengthBottomSheetOpen,
  );

  const { mutateAsync: imagePresign } = useImagePresignedUrl();
  const { mutateAsync: memory } = useMemory();

  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);
  const setIsDistancePageModalOpen = useSetAtom(isDistancePageModalOpen);
  const setTimeBottomSheetState = useSetAtom(timeBottomSheetState);
  const formSubInfo = useAtomValue(formSubInfoState);

  const startTime = methods.watch('startTime');
  const endTime = methods.watch('endTime');
  const diary = methods.watch('diary');

  const isRecordAbled = startTime && endTime;

  const onSubmit: SubmitHandler<RecordRequestProps> = async (data) => {
    if (formSubInfo.imageFiles.length > 0) {
      await imagePresign(formSubInfo.imageFiles).then(async (res) => {
        await memory({ ...data, imageIdList: [res.data[0].imageId] }).then(
          (res) => {
            router.push(
              `/record/success?rank=${res.data.rank}&memoryId=${res.data.memoryId}`,
            );
          },
        );
      });
    } else {
      await memory(data).then((res) =>
        router.push(
          `/record/success?rank=${res.data.rank}&memoryId=${res.data.memoryId}`,
        ),
      );
    }
  };

  return (
    //react-hook-form 전역적으로 사용
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={layoutStyles}>
        <div className={cx(formSectionStyles)}>
          <TextField
            variant="select"
            isRequired
            value={methods.getValues('recordAt')}
            label="수영 날짜"
            wrapperClassName={css({ marginBottom: '24px' })}
          />
          <div className={timeStyles.layout}>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value={startTime || ''}
              placeholder="00:00"
              label="수영 시간"
              wrapperClassName={timeStyles.field}
              onClick={() =>
                setTimeBottomSheetState((prev) => ({
                  ...prev,
                  variant: 'start',
                  isOpen: true,
                }))
              }
            />
            <span className={css({ fontSize: '30px' })}>-</span>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value={endTime || ''}
              label="수영 시간"
              placeholder="00:00"
              wrapperClassName={timeStyles.field}
              onClick={() =>
                setTimeBottomSheetState((prev) => ({
                  ...prev,
                  variant: 'end',
                  isOpen: true,
                }))
              }
            />
          </div>
          <TextField
            variant="select"
            value={formSubInfo.poolName || ''}
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
            value={
              formSubInfo.totalDistance ? formSubInfo.totalDistance + 'm' : ''
            }
            placeholder="거리입력(선택)"
            label="수영 거리"
            onClick={() =>
              setIsDistancePageModalOpen({
                isOpen: true,
                jumpDirection: 'forward',
              })
            }
          />
          <div className={buttonStyles.layout}>
            <Button
              label={searchParams.get('memoryId') ? '수정하기' : '기록하기'}
              size="large"
              className={buttonStyles.content}
              disabled={!isRecordAbled}
            />
          </div>
        </div>
        <Divider variant="thick" />
        <PhotoSection title="오늘의 사진" />
        <Divider variant="thick" />
        <DiarySection title="일기" value={diary || ''} />
        <Divider variant="thick" />
        <EquipmentSection title="장비" />
        <Divider variant="thick" />
        <SubInfoSection title="심박수 · 페이스 · 칼로리" />
      </form>
      <LaneLengthBottomSheet title="레인 길이를 선택해주세요" />
      <PoolSearchPageModal title="어디서 수영했나요?" />
      <DistancePageModal />
      <TimeBottomSheet />
    </FormProvider>
  );
}

const layoutStyles = css({
  paddingBottom: '100px',
});

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

const buttonStyles = {
  layout: css({
    position: 'fixed',
    width: '100%',
    bottom: '32px',
    left: 0,
    padding: '0 20px',
    zIndex: 10,
  }),

  content: css({
    width: '100%',
  }),
};
