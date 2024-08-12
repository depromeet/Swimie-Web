import { StrokeProps } from '../../types';

export interface RecordRequestProps {
  poolId?: number;
  item?: string;
  heartRate?: number;
  paceMinutes?: number;
  paceSeconds?: number;
  kcal?: number;
  recordAt: string; // 필수
  startTime: string; // 필수
  endTime: string; // 필수
  lane: string; //디폴트 25
  diary?: string;
  strokes: StrokeProps[];
  imageIdList: number[];
  poolName?: string;
  totalDistance?: string;
}
