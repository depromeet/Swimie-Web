export type Response<T = unknown> = {
  status: number;
  code: string;
  message: string;
  data: T;
};
