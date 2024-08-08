import { atom } from 'jotai';

export interface AuthInfo {
  isLogined: boolean;
  nickname: string;
  userId: number;
}

export const AuthInfoAtom = atom<AuthInfo>({
  isLogined: false,
  nickname: '',
  userId: 0,
});
