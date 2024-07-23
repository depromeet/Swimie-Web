'use client';

import { Divider } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import {
  LaneLengthBottomSheet,
  PoolSearchBottomSheet,
  TimeBottomSheet,
} from '../record-bottom-sheet';
import { useEndTimeBottomSheet } from '../record-bottom-sheet/use-end-time-bottom-sheet';
import { useLaneLengthBottomSheet } from '../record-bottom-sheet/use-lane-length-bottom-sheet';
import { usePoolSearchBottomSheet } from '../record-bottom-sheet/use-pool-search-bottom-sheet';
import { useStartTimeBottomSheet } from '../record-bottom-sheet/use-start-time-bottom-sheet';
import { RecordDistancePageModal } from '../record-distance-page-modal';
import { useRecordDistancePageModal } from '../record-distance-page-modal/use-record-distance-page-modal';
import { railLengthOptions } from './options';
import { useRecordForm } from './use-record-form';

export function RecordForm() {
  //달력 클릭하면 날짜 넘어오는 형식에 맞게 함수에 전달 값 수정
  const { recordInfo, subInfo, handlers } = useRecordForm('2024년 7월 -일');
  const {
    isOpen: isStartTimeBottomSheetOpen,
    handlers: startTimeBottomSheetHandlers,
  } = useStartTimeBottomSheet();
  const {
    isOpen: isEndTimeBottomSheetOpen,
    handlers: endTimeBottomSheetHandlers,
  } = useEndTimeBottomSheet();
  const {
    isOpen: isPoolSearchBottomSheetOpen,
    handlers: poolSearchBottomSheetHandlers,
  } = usePoolSearchBottomSheet();
  const {
    isOpen: isLaneLengthBottomSheetOpen,
    handlers: laneLengthBottomSheetHandlers,
  } = useLaneLengthBottomSheet();
  const {
    isOpen: isRecordDistancePageModalOpen,
    jumpDirection,
    handlers: recordDistancePageModalHandlers,
  } = useRecordDistancePageModal();
  return (
    <>
      <form>
        <div className={textFieldStyles}>
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
            hasDownArrow
            placeholder="(선택)"
            label="수영장"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={poolSearchBottomSheetHandlers.openBottomSheet}
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
              subInfo.totalMeters > 0
                ? String(subInfo.totalMeters) + 'm'
                : undefined
            }
            placeholder="거리입력(선택)"
            label="수영 거리"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={recordDistancePageModalHandlers.openPageModal}
          />
        </div>
        <Divider variant="thick" />
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
        modifyValue={handlers.onChangeRailLength}
        closeBottomSheet={laneLengthBottomSheetHandlers.closeBottomSheet}
      />
      <PoolSearchBottomSheet
        isOpen={isPoolSearchBottomSheetOpen}
        title="어디서 수영을 했나요?"
        placeholder="수영장 검색"
        modifyValue={handlers.onChangePool}
        closeBottomSheet={poolSearchBottomSheetHandlers.closeBottomSheet}
      />
      <TimeBottomSheet
        isOpen={isStartTimeBottomSheetOpen}
        modifyValue={handlers.onChangeStartTime}
        closeBottomSheet={startTimeBottomSheetHandlers.closeBottomSheet}
      />
      <TimeBottomSheet
        isOpen={isEndTimeBottomSheetOpen}
        modifyValue={handlers.onChangeEndTime}
        closeBottomSheet={endTimeBottomSheetHandlers.closeBottomSheet}
      />
      <RecordDistancePageModal
        currentLane={recordInfo.lane}
        modifyTotalMeters={handlers.onChangeTotalMeters}
        modifyTotalLaps={handlers.onChangeTotalLaps}
        modifyStrokes={handlers.onChangeStrokes}
        isOpen={isRecordDistancePageModalOpen}
        jumpDirection={jumpDirection}
        closePageModal={recordDistancePageModalHandlers.closePageModal}
      />
      {/* BottomSheet 관리 어떻게 할지 리팩토링 필요 */}
    </>
  );
}

const textFieldStyles = css({
  width: '100%',
  padding: '0px 20px',
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
