export interface PoolProps {
  poolId: number;
  name: string;
  address: string;
  isFavorite: boolean;
}

export interface SearchPoolInitialResultResponse {
  status: number;
  code: string;
  message: string;
  data: {
    favoritePools: PoolProps[];
    searchedPools: PoolProps[];
  };
}

export interface SearchPoolResultResponse {
  status: number;
  code: string;
  message: string;
  data: {
    poolInfos: PoolProps[];
    pageSize: number;
    cursorId: number;
    hasNext: boolean;
  };
}
