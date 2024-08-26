export interface ProfileProps {
  status: number;
  code: string;
  data: {
    memberId: number;
    nickname: string;
    isMyProfile: boolean;
    followerCount: number;
    followingCount: number;
    introduction: string;
  };
}
