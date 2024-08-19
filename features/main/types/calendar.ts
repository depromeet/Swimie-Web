import { StrokeInfo } from './time-line';

export type MemoryType = 'NORMAL' | 'SINGLE' | 'MULTI';

export interface Strokes {
  총거리?: number;
  자유형?: number;
  평영?: number;
  배영?: number;
  접영?: number;
  킥판?: number;
}

export interface MemberInfo {
  name?: string;
  goal: number;
}

export interface Memory {
  memoryId: number;
  memoryDate: number;
  type: MemoryType;
  totalDistance?: number;
  isAchieved?: boolean;
  strokes?: Array<StrokeInfo>;
  imageUrl?: string;
}

export interface CalendarResponse {
  status: number;
  code: string;
  message: string;
  data: {
    member: MemberInfo;
    memories: Array<Memory>;
  };
}
