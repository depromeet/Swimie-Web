/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { SelectTextField } from '@/components/molecules/text-field/select-text-field';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { formatDateToDash, formatDateToKorean, getToday } from '@/utils';

import {
  useGetImagePresignedUrl,
  useImagePresignUrl,
  useMemory,
  usePullEditMemory,
} from '../../apis';
import { RecordRequestProps, SubmitRecordRequestProps } from '../../apis/dto';
import { useImageEdit } from '../../apis/use-image-edit';
import { useImageStatus } from '../../apis/use-image-status';
import { useMemoryEdit } from '../../apis/use-memory-edit';
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

//Todo: watch의 성능 이슈 고민
//Todo: form.tsx 파일 내부 리팩토링
//Todo: 수정모드일 시, 기록 불러올 때 보여줄 로딩 UI 구현
//Todo: 수정모드일 시, 불러온 기록 데이터에서 차이가 없을 때는 버튼 disabled
export function Form() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const isEditMode = Boolean(searchParams.get('memoryId'));
  const { data } = usePullEditMemory(Number(searchParams.get('memoryId')));
  const [formSubInfo, setFormSubInfo] = useAtom(formSubInfoState);
  const methods = useForm<RecordRequestProps>({
    defaultValues: {
      recordAt: date ? date : getToday(),
      startTime: '',
      endTime: '',
      laneMeter: '25m',
      lane: 25,
      strokes: [],
      imageIdList: [],
    },
  });
  useEffect(() => {
    if (data) {
      const prevData = data.data;
      methods.reset({
        recordAt: formatDateToKorean(prevData.recordAt),
        startTime: prevData.startTime,
        endTime: prevData.endTime,
        lane: prevData.lane,
        laneMeter: prevData.lane + 'm',
        poolId: prevData?.pool?.id ? prevData.pool.id : undefined,
        poolName: prevData?.pool?.name ? prevData.pool.name : undefined,
        diary: prevData.diary ? prevData.diary : undefined,
        heartRate: prevData.memoryDetail.heartRate
          ? prevData.memoryDetail.heartRate
          : undefined,
        paceMinutes: prevData.memoryDetail.paceMinutes
          ? prevData.memoryDetail.paceMinutes
          : undefined,
        paceSeconds: prevData.memoryDetail.paceSeconds
          ? prevData.memoryDetail.paceSeconds
          : undefined,
        kcal: prevData.memoryDetail.kcal
          ? prevData.memoryDetail.kcal
          : undefined,
        strokes: prevData.strokes ? prevData.strokes : undefined,
        totalDistance: prevData.totalMeter
          ? prevData.totalMeter + 'm'
          : undefined,
      });
      setFormSubInfo({
        imageFiles: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const router = useRouter();
  const setIsLaneLengthBottomSheetOpen = useSetAtom(
    isLaneLengthBottomSheetOpen,
  );

  const { mutateAsync: getImagePresignedUrl } = useGetImagePresignedUrl();
  const { mutateAsync: memory } = useMemory();
  const { mutateAsync: memoryEdit } = useMemoryEdit();
  const { mutateAsync: imagePresign } = useImagePresignUrl();
  const { mutateAsync: imageStatus } = useImageStatus();
  const { mutateAsync: imageEdit } = useImageEdit();

  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);
  const setIsDistancePageModalOpen = useSetAtom(isDistancePageModalOpen);
  const setTimeBottomSheetState = useSetAtom(timeBottomSheetState);

  const getBlobData = (file: File) => {
    const blobData = new Blob([file]);
    return blobData;
  };

  const modifySubmitData = (data: SubmitRecordRequestProps) => {
    const modifiedData = { ...data };

    if (isEditMode)
      modifiedData.recordAt = formatDateToDash(modifiedData.recordAt);
    Object.keys(data).map((field) => {
      const key = field as keyof typeof data;
      if (
        (typeof data[key] === 'string' && data[key] === '') || // 수정: 'typeof data[key]'을 'string' 체크로 수정
        (typeof data[key] === 'number' && isNaN(data[key]))
      ) {
        delete modifiedData[key];
      }
    });

    return modifiedData;
  };

  //Todo: 기록 에러 발생 시 처리
  const onSubmit: SubmitHandler<RecordRequestProps> = async (data) => {
    //기록 수정 모드일 때
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { poolName, laneMeter, totalDistance, ...restData } = data;
    const submitData = modifySubmitData(restData);
    if (isEditMode) {
      //이미지가 수정 되었을 때
      if (formSubInfo.imageFiles.length > 0) {
        const getImagePresignedUrlRes = await imageEdit({
          imageNames: [formSubInfo.imageFiles[0].name],
          memoryId: Number(searchParams.get('memoryId')),
        });
        await imagePresign({
          presignedUrl: getImagePresignedUrlRes.data[0].presignedUrl,
          file: getBlobData(formSubInfo.imageFiles[0]),
        });
        await imageStatus([getImagePresignedUrlRes.data[0].imageId]);
        const memoryRes = await memoryEdit({
          formData: {
            ...submitData,
            imageIdList: [getImagePresignedUrlRes.data[0].imageId],
          },
          memoryId: Number(searchParams.get('memoryId')),
        });
        if (memoryRes.status === 200)
          router.push(
            `/record/success?editMode=true&memoryId=${Number(searchParams.get('memoryId'))}`,
          );
      }
      //이미지가 수정되지 않았을 때
      else {
        const memoryEditRes = await memoryEdit({
          formData: submitData,
          memoryId: Number(searchParams.get('memoryId')),
        });
        if (memoryEditRes)
          router.push(
            `/record/success?editMode=true&memoryId=${Number(searchParams.get('memoryId'))}`,
          );
      }
    }
    //기록 생성 모드일 때
    else {
      //기록에서 이미지가 포함되었을 때
      if (formSubInfo.imageFiles.length > 0) {
        const getImagePresignedUrlRes = await getImagePresignedUrl([
          formSubInfo.imageFiles[0].name,
        ]);
        await imagePresign({
          presignedUrl: getImagePresignedUrlRes.data[0].presignedUrl,
          file: getBlobData(formSubInfo.imageFiles[0]),
        });
        await imageStatus([getImagePresignedUrlRes.data[0].imageId]);
        const memoryRes = await memory({
          ...submitData,
          imageIdList: [getImagePresignedUrlRes.data[0].imageId],
        });
        if (memoryRes.status === 200)
          router.push(
            `/record/success?rank=${memoryRes.data.rank}&memoryId=${memoryRes.data.memoryId}&month=${memoryRes.data.month}`,
          );
      }
      //기록에서 이미지가 포함되지 않았을 때
      else {
        const memoryRes = await memory(submitData);
        if (memoryRes.status === 200)
          router.push(
            `/record/success?rank=${memoryRes.data.rank}&memoryId=${memoryRes.data.memoryId}&month=${memoryRes.data.month}`,
          );
      }
    }
  };

  return (
    //react-hook-form 전역적으로 사용
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={cx(formSectionStyles)}>
          <SelectTextField
            fieldName="recordAt"
            isRequired
            label="수영 날짜"
            wrapperClassName={css({ marginBottom: '24px' })}
          />
          <div className={timeStyles.layout}>
            <SelectTextField
              fieldName="startTime"
              isRequired
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
            <SelectTextField
              fieldName="endTime"
              isRequired
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
          <SelectTextField
            fieldName="poolName"
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
          <SelectTextField
            fieldName="laneMeter"
            label="레인 길이"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={() => setIsLaneLengthBottomSheetOpen(true)}
          />
          <SelectTextField
            fieldName="totalDistance"
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
              label={isEditMode ? '수정하기' : '기록하기'}
              size="large"
              className={buttonStyles.content}
              // disabled={!isRecordAbled}
            />
          </div>
        </div>
        <Divider variant="thick" />
        <PhotoSection
          title="오늘의 사진"
          defaultImage={
            data && data.data.images.length > 0
              ? data?.data.images[0].url
              : undefined
          }
        />
        <Divider variant="thick" />
        <DiarySection title="일기" />
        <Divider variant="thick" />
        <EquipmentSection
          title="장비"
          defaultEquipment={data?.data.memoryDetail.item}
        />
        <Divider variant="thick" />
        <SubInfoSection title="심박수 · 페이스 · 칼로리" />
        <div className={blockStyles} />
      </form>
      <LaneLengthBottomSheet title="레인 길이를 선택해주세요" />
      <PoolSearchPageModal title="어디서 수영했나요?" />
      <DistancePageModal
        defaultStrokes={data?.data.strokes}
        defaultTotalMeter={data?.data.totalMeter}
        defaultTotalLap={data?.data.totalLap}
      />
      <TimeBottomSheet />
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

const buttonStyles = {
  layout: flex({
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0,
    padding: '16px 20px 32px 20px',
    zIndex: 10,
    backgroundColor: 'white',
  }),

  content: css({
    width: '100%',
    maxWidth: '560px',
  }),
};

const blockStyles = css({
  height: '100px',
  backgroundColor: 'line.alternative',
});
