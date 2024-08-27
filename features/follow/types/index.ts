import { Response } from '@/apis';

export type FollowTab = 'follow' | 'following';

export type ProfileFollowContent = {
  memberId: number;
  name: string;
  profileImageUrl: string;
  introduction: string;
};

export type ProfileFollow = Response<{
  contents: ProfileFollowContent[];
  cursorId: number;
  hasNext: boolean;
}>;
