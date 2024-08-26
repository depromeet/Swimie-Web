export type Response<T = unknown> = {
  status: string;
  code: string;
  message: string;
  data: T;
};
