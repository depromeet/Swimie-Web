import { useQuery, useQueryClient } from '@tanstack/react-query';

type OmittedOriginal<TType> = Omit<TType, '_original'>;

export type MemberFollowingState = {
  _original: OmittedOriginal<MemberFollowingState> | null;
  isFollowing: boolean;
};

// member ID별 고유한 쿼리 키
const getQueryKey = (memberId: number) => ['followingState', String(memberId)];

// initialFollowingState = false로 설정
// _original : 서버에서 맨 처음 받아온 데이터
const initialFollowingState: MemberFollowingState = {
  _original: null,
  isFollowing: false,
};

/**
 * @description 멤버별 팔로잉/팔로우 여부 관리하는 store
 */
export const useMemberFollowingStore = () => {
  const qc = useQueryClient();

  // member ID에 대해 팔로잉 여부 데이터 set
  const set = (memberId: number, isFollowingState: MemberFollowingState) => {
    qc.setQueryData(getQueryKey(memberId), () => isFollowingState);
  };

  // member ID에 대해 팔로잉 여부 데이터 get
  const get = (memberId: number) =>
    qc.getQueryData<MemberFollowingState>(getQueryKey(memberId));

  // member ID에 대해 안전한 팔로잉 여부 데이터 get -> 없을 시에 initialFollowingState 반환
  const safeGet = (memberId: number) => {
    const stored = get(memberId);
    if (!stored) {
      set(memberId, { ...initialFollowingState });
      return { ...initialFollowingState };
    }
    return stored;
  };

  // 여러개의 member ID에 대한 팔로잉 여부 데이터 동기화
  const sync = (data: Map<number, MemberFollowingState>) => {
    data.forEach((isFollowingState, memberId) =>
      set(memberId, isFollowingState),
    );
    return data.size;
  };

  // member ID에 대한 팔로잉 여부 데이터를 가져오는 훅
  const useMemberIsFollowing = (memberId: number) => {
    const { data } = useQuery<MemberFollowingState>({
      queryKey: getQueryKey(memberId),
      queryFn: () => safeGet(memberId),
      initialData: safeGet(memberId),
      staleTime: Infinity,
    });

    return data;
  };

  return {
    set,
    safeGet,
    sync,
    useMemberIsFollowing,
  };
};
