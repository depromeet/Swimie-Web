import { atom } from 'jotai';

export interface AuthInfo {
  isLogined: boolean;
  userId: number;
}

export const AuthInfoAtom = atom<AuthInfo>({
  isLogined: false,
  userId: 0,
});
