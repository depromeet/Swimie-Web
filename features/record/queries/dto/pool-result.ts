export interface SearchPoolResultResponse {
  status: number;
  code: string;
  message: string;
  data: {
    poolInfos: [
      {
        poolId: number;
        name: string;
      },
    ];
  };
}
