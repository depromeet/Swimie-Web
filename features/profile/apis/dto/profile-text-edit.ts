import { Response } from '@/apis';

export interface ProfileTextEditResponse extends Response {
  data: {
    memberId: number;
    nickname: string;
    introduction: string;
  };
}
