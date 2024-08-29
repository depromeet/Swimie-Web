'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { Response } from '@/apis';
import { useMemberFollowingStore } from '@/store';

import { useFollowMutate } from './use-follow-mutate';

export type FollowState = {
  memberId: number;
  isFollowing: boolean;
};

export type FollowStateResponse = Response<{ followingList: FollowState[] }>;

const fetchFollowingList = async (friendsArr: number[]) => {
  const res = await fetch(`/api/friend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ friends: friendsArr }),
  });

  return res.json();
};

export const useMemberFollowingState = () => {
  const {
    safeGet,
    set: storeSet,
    useMemberIsFollowing,
  } = useMemberFollowingStore();
  const { mutate: debouncedFollowMutate } = useFollowMutate();

  // NOTE: 단일 isFollowing state 조회
  const getMemberFollowingState = async (friendId: number) => {
    const storedData = safeGet(friendId);

    if (!storedData._original) {
      const { data } = (await fetchFollowingList([
        friendId,
      ])) as FollowStateResponse;

      if (data?.followingList?.length) {
        const isFollowing = data.followingList.find(
          ({ memberId }) => memberId === friendId,
        )?.isFollowing;

        if (isFollowing === undefined) {
          return storedData;
        }
        const _original = {
          isFollowing,
        };
        const fetchingFollowingState = {
          _original,
          ..._original,
        };

        storeSet(friendId, fetchingFollowingState);
        return fetchingFollowingState;
      }
    }

    return storedData;
  };

  // NOTE: 리스트 isFollowing State 조회
  const useSyncFollowingListState = (friendsArr: number[]) => {
    const enabled = !!friendsArr.length;
    const { data, refetch } = useQuery<FollowStateResponse>({
      queryKey: ['useFollowingState', friendsArr],
      queryFn: () => fetchFollowingList(friendsArr),
      enabled,
    });
    const followingList = useMemo(
      () => data?.data?.followingList ?? [],
      [data],
    );

    useEffect(() => {
      followingList.forEach(({ memberId, isFollowing }) => {
        const fetchingFollowingState = {
          isFollowing: isFollowing ?? false,
        };
        const storeFollowingState = {
          _original: fetchingFollowingState,
          ...fetchingFollowingState,
        };

        storeSet(memberId, storeFollowingState);
      });
    }, [followingList]);

    return {
      data,
      refetch: () => enabled && refetch(),
    };
  };

  // NOTE: toggle Follow State
  const toggleFollow = async (friendId: number) => {
    const currentFollowingState = await getMemberFollowingState(friendId);

    if (!currentFollowingState._original) {
      console.warn(`friendId:${friendId} 인 following 여부 정보가 없습니다.`);
      return;
    }

    const nextFollowingState = {
      _original: currentFollowingState._original,
      isFollowing: !currentFollowingState.isFollowing,
    };

    storeSet(friendId, nextFollowingState);
    debouncedFollowMutate(friendId);
  };

  return {
    getMemberFollowingState,
    useSyncFollowingListState,
    useMemberIsFollowing,
    toggleFollow,
  };
};
