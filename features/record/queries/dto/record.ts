import { StrokeProps } from '../../type';

export interface RecordRequestProps {
  poolId: number | null;
  item: string | null;
  heartRate: number | null;
  pace: string | null;
  kcal: number | null;
  recordAt: string; // 필수
  startTime: string; // 필수
  endTime: string; // 필수
  lane: number; //디폴트 25
  diary: string | null;
  strokes: StrokeProps[];
  imageIdList: number[];
}
