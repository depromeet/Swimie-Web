'use client';

import { Divider } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import {
  LaneLengthBottomSheet,
  PoolSearchPageModal,
  TimeBottomSheet,
} from '../record-animation-ui';
import { useEndTimeBottomSheet } from '../record-animation-ui/use-end-time-bottom-sheet';
import { useLaneLengthBottomSheet } from '../record-animation-ui/use-lane-length-bottom-sheet';
import { usePoolSearchPageModal } from '../record-animation-ui/use-pool-search-page-modal';
import { useStartTimeBottomSheet } from '../record-animation-ui/use-start-time-bottom-sheet';
import { RecordDiary } from '../record-diary/record-diary';
import { RecordDistancePageModal } from '../record-distance-page-modal';
import { useRecordDistancePageModal } from '../record-distance-page-modal/use-record-distance-page-modal';
import { RecordEquipment } from '../record-equipment';
import { RecordPhoto } from '../record-photo/record-photo';
import { RecordSubInfo } from '../record-sub-info';
import { railLengthOptions } from './options';
import { useRecordForm } from './use-record-form';

export function RecordForm() {
  //달력 클릭하면 날짜 넘어오는 형식에 맞게 함수에 전달 값 수정
  const { recordInfo, subInfo, handlers } = useRecordForm('2024년 7월 -일');
  console.log(recordInfo);
  const {
    isOpen: isStartTimeBottomSheetOpen,
    handlers: startTimeBottomSheetHandlers,
  } = useStartTimeBottomSheet();
  const {
    isOpen: isEndTimeBottomSheetOpen,
    handlers: endTimeBottomSheetHandlers,
  } = useEndTimeBottomSheet();
  const {
    isOpen: isPoolSearchPageModalOpen,
    jumpDirection: poolSearchPageModalJumpDirection,
    handlers: poolSearchPageModalHandlers,
  } = usePoolSearchPageModal();
  const {
    isOpen: isLaneLengthBottomSheetOpen,
    handlers: laneLengthBottomSheetHandlers,
  } = useLaneLengthBottomSheet();
  const {
    isOpen: isRecordDistancePageModalOpen,
    jumpDirection: recordDistancePageModalJumpDirection,
    handlers: recordDistancePageModalHandlers,
  } = useRecordDistancePageModal();
  return (
    <>
      <form>
        <div className={textFieldSectionStyles}>
          <TextField
            variant="select"
            isRequired
            placeholder={recordInfo.recordAt}
            label="수영 날짜"
            wrapperClassName={css({ marginBottom: '24px' })}
          />
          <div className={timeTextFieldLayoutStyles}>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value={recordInfo.startTime}
              placeholder="00:00"
              label="수영 시간"
              wrapperClassName={timeTextFieldStyles}
              onClick={startTimeBottomSheetHandlers.openBottomSheet}
            />
            <span className={css({ fontSize: '30px' })}>-</span>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value={recordInfo.endTime}
              label="수영 시간"
              placeholder="00:00"
              wrapperClassName={timeTextFieldStyles}
              onClick={endTimeBottomSheetHandlers.openBottomSheet}
            />
          </div>
          <TextField
            variant="select"
            value={subInfo.poolName}
            placeholder="(선택)"
            label="수영장"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={poolSearchPageModalHandlers.openPageModal}
          />
          <TextField
            variant="select"
            value={String(recordInfo.lane) + 'm'}
            label="레일 길이"
            hasDownArrow
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={laneLengthBottomSheetHandlers.openBottomSheet}
          />
          <TextField
            variant="select"
            value={
              subInfo.totalMeters > 0 ? String(subInfo.totalMeters) + 'm' : ''
            }
            placeholder="거리입력(선택)"
            label="수영 거리"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={recordDistancePageModalHandlers.openPageModal}
          />
        </div>
        <Divider variant="thick" />
        <RecordPhoto
          title="오늘의 사진"
          onSelectImage={handlers.onSelectImage}
        />
        <Divider variant="thick" />
        <RecordDiary
          title="일기"
          value={recordInfo.diary ? recordInfo.diary : ''}
          onChange={handlers.onChangeDiary}
        />
        <Divider variant="thick" />
        <RecordEquipment title="장비" />
        <Divider variant="thick" />
        <RecordSubInfo title="심박수 · 페이스 · 칼로리" />
      </form>
      {/* BottomSheet 관리 어떻게 할지 리팩토링 필요 */}
      <LaneLengthBottomSheet
        title="레인 길이를 선택해주세요"
        value={
          recordInfo.lane === Number(railLengthOptions[0].label.slice(0, -1))
            ? 0
            : 1
        }
        isOpen={isLaneLengthBottomSheetOpen}
        modifyValue={handlers.onSelectRailLength}
        closeBottomSheet={laneLengthBottomSheetHandlers.closeBottomSheet}
      />
      <PoolSearchPageModal
        isOpen={isPoolSearchPageModalOpen}
        title="어디서 수영했나요?"
        placeholder="수영장 검색"
        modifyValue={handlers.onSelectPool}
        jumpDirection={poolSearchPageModalJumpDirection}
        closeModal={poolSearchPageModalHandlers.closePageModal}
      />
      <TimeBottomSheet
        isOpen={isStartTimeBottomSheetOpen}
        modifyValue={handlers.onSelectStartTime}
        closeBottomSheet={startTimeBottomSheetHandlers.closeBottomSheet}
      />
      <TimeBottomSheet
        isOpen={isEndTimeBottomSheetOpen}
        modifyValue={handlers.onSelectEndTime}
        closeBottomSheet={endTimeBottomSheetHandlers.closeBottomSheet}
      />
      <RecordDistancePageModal
        currentLane={recordInfo.lane}
        modifyTotalMeters={handlers.onChangeTotalMeters}
        modifyTotalLaps={handlers.onChangeTotalLaps}
        modifyStrokes={handlers.onChangeStrokes}
        isOpen={isRecordDistancePageModalOpen}
        jumpDirection={recordDistancePageModalJumpDirection}
        closePageModal={recordDistancePageModalHandlers.closePageModal}
      />
      {/* BottomSheet 관리 어떻게 할지 리팩토링 필요 */}
    </>
  );
}

const textFieldSectionStyles = css({
  padding: '24px 20px',
});

const timeTextFieldLayoutStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const timeTextFieldStyles = css({
  width: '42%',
  marginBottom: '24px',
});
