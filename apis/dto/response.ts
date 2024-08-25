export type Response<T = unknown> = {
  data: T;
  result: string;
  code: string;
  message: string;
};
