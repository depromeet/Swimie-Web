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

export type DetailStrokes = {
  strokeId: number;
  name: '자유형' | '배영' | '접영' | '평영' | '킥판';
  laps: number;
  meter: number;
};

export type DetailMemoryDetail = {
  item: string;
  heartRate: number;
  pace: string;
  kcal: number;
};

export type RecordDetailType = {
  id: number;
  member: DetailMember;
  pool: DetailPool;
  memoryDetail: DetailMemoryDetail;
  strokes: DetailStrokes[];
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
