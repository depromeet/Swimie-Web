import { StrokeProps } from '../../types';

export interface RecordRequestProps {
  poolId?: number;
  item?: string;
  heartRate?: number;
  pace?: string;
  kcal?: number;
  recordAt: string; // 필수
  startTime: string; // 필수
  endTime: string; // 필수
  lane: number; //디폴트 25
  diary?: string;
  strokes: StrokeProps[];
  imageIdList: number[];
}
