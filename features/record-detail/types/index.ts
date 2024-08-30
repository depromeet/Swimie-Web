import { StrokeName } from '@/types';

export type DetailMember = {
  goal: number;
  name: string;
};

export type DetailPool = {
  id: number;
  name: string;
  address: string;
  lane: number;
};

export type StrokeMapType = Record<StrokeName, DetailStroke>;
export type DetailStroke = {
  strokeId: number;
  name: StrokeName;
  laps: number;
  meter: number;
};

export type DetailMemoryDetail = {
  item: string;
  heartRate: number;
  paceMinutes: string;
  paceSeconds: string;
  kcal: number;
};

export type RecordDetailType = {
  id: number;
  type: 'NORMAL' | 'SINGLE' | 'MULTI';
  recordAt: string;
  startTime: string;
  endTime: string;
  // 배열 데이터는 데이터가 없을 경우 빈 배열로 수신
  strokes: DetailStroke[];
  images: {
    imageName: string;
    url: string;
  }[];
  prevId?: number;
  nextId?: number;
  member?: DetailMember;
  pool?: DetailPool;
  memoryDetail?: DetailMemoryDetail;
  duration?: string;
  lane?: number;
  totalLap?: number;
  totalMeter?: number;
  diary?: string;
  isMyMemory?: boolean;
};

export type DetailCheerItem = {
  emoji: string;
  comment?: string;
};

export type DetailCheerItemSelected = {
  isSelected?: boolean;
} & DetailCheerItem;

export type DetailCheerPreview = {
  reactions: CheerPreview[];
};

export type CheerPreview = {
  reactionId: number;
  nickname: string;
  profileImageUrl: string;
  memberId: number;
} & DetailCheerItem;
