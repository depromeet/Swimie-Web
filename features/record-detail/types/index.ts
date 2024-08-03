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
  member: DetailMember;
  pool: DetailPool;
  memoryDetail: DetailMemoryDetail;
  strokes: DetailStroke[];
  images: {
    imageName: string;
    url: string;
  }[];
  recordAt: string;
  startTime: string;
  endTime: string;
  duration: string;
  lane: number;
  totalLap: number;
  totalMeter: number;
  diary: string;
};
