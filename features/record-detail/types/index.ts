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
export type StrokeName = '자유형' | '배영' | '접영' | '평영' | '킥판';
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
  member?: DetailMember;
  pool?: DetailPool;
  memoryDetail?: DetailMemoryDetail;
  duration?: string;
  lane?: number;
  totalLap?: number;
  totalMeter?: number;
  diary?: string;
};

export type DetailCheerItem = {
  emoji?: string;
  comment?: string;
};
