import { StrokeProps } from '../../types';

export interface RecordRequestProps {
  poolId?: number;
  poolName?: string;
  item?: string;
  heartRate?: number;
  paceMinutes?: number;
  paceSeconds?: number;
  kcal?: number;
  recordAt: string; // 필수
  startTime: string; // 필수
  endTime: string; // 필수
  lane: number; //디폴트 25
  laneMeter: string;
  diary?: string;
  strokes: StrokeProps[];
  imageIdList: number[];
  totalDistance?: string;
}

export interface SubmitRecordRequestProps
  extends Omit<
    RecordRequestProps,
    'poolName' | 'laneMeter' | 'totalDistance'
  > {}
