export interface MemoryResponse {
  status: number;
  code: string;
  message: string;
  data: {
    rank: number;
    memoryId: number;
  };
}
