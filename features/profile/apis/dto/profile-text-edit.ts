import { Response } from '@/apis';

export type ProfileTextEditResponse = Response<{
  memberId: number;
  nickname: string;
  introduction: string;
}>;
