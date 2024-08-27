import { Response } from '@/apis';

export type ProfileImageUrlDoneResponse = Response<{
  introduction: string;
  memberId: number;
  nickname: string;
}>;
