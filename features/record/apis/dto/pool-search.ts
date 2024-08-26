import { Response } from '@/apis';

export interface PoolProps {
  poolId: number;
  name: string;
  address: string;
  isFavorite: boolean;
}

export type SearchPoolInitialResultResponse = Response<{
  favoritePools: PoolProps[];
  searchedPools: PoolProps[];
}>;

export type SearchPoolResultResponse = Response<{
  poolInfos: PoolProps[];
  pageSize: number;
  cursorId: number;
  hasNext: boolean;
}>;
