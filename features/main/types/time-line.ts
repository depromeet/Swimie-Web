import { StrokeName } from '@/types';

import { MemberInfo, MemoryType } from './calendar';

export interface StrokeInfo {
  strokeId: number;
  name: StrokeName;
  laps: number;
  meter: number;
}

export interface TimeLineResponse {
  status: number;
  code: string;
  message: string;
  data: {
    member: MemberInfo;
    content: Array<TimeLineContent>;
    pageSize: number;
    cursorRecordAt: number;
    hasNext: boolean;
  };
}

export interface TimeLineContent {
  memoryId: number;
  type: MemoryType;
  recordAt: string;
  startTime?: string;
  endTime?: string;
  lane: number;
  diary?: string;
  totalDistance?: number;
  kcal?: number;
  strokes?: Array<StrokeInfo>;
  isAchieved?: boolean;
  imageUrl?: string;
  reactionCount?: number;
}
