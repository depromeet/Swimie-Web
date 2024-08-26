import { Response } from '@/apis';

export type MemoryResponse = Response<{
  month: number;
  rank: number;
  memoryId: number;
}>;

export type MemoryPullResponse = Response<{
  id: number;
  member: {
    goal: number;
    name: string;
  };
  pool: {
    id: number;
    name: string;
    address: string;
    lane: number;
  };
  memoryDetail: {
    item: string;
    heartRate: number;
    paceMinutes: number;
    paceSeconds: number;
    kcal: number;
  };
  strokes: [
    {
      strokeId: number;
      name: string;
      laps: number;
      meter: number;
    },
  ];
  images: [
    {
      imageName: string;
      url: string;
    },
  ];
  recordAt: string;
  startTime: string;
  endTime: string;
  duration: string;
  lane: number;
  totalLap: number;
  totalMeter: number;
  diary: string;
}>;
