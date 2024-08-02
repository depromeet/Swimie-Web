export interface MemoryResponse {
  status: number;
  code: string;
  message: string;
  data?: {
    valid_startTime: string;
    valid_recordAt: string;
    valid_endTime: string;
  };
}
