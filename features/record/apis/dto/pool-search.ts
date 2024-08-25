import { Response } from '@/apis';

export interface PoolProps {
  poolId: number;
  name: string;
  address: string;
  isFavorite: boolean;
}

export interface SearchPoolInitialResultResponse extends Response {
  data: {
    favoritePools: PoolProps[];
    searchedPools: PoolProps[];
  };
}

export interface SearchPoolResultResponse extends Response {
  data: {
    poolInfos: PoolProps[];
    pageSize: number;
    cursorId: number;
    hasNext: boolean;
  };
}
