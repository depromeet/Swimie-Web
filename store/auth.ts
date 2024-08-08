import { atom } from 'jotai';

export interface AuthInfo {
  isLogined: boolean;
  userName: string;
  userId: number;
}

export const AuthInfoAtom = atom<AuthInfo>({
  isLogined: false,
  userName: '',
  userId: 0,
});
