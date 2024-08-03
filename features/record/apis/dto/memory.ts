export interface MemoryResponse {
  status: number;
  code: string;
  message: string;
  data: {
    rank: number;
    memoryId: number;
  };
}

export interface MemoryPullResponse {
  status: number;
  code: string;
  message: string;
  data: {
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
      pace: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
      };
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
  };
}
