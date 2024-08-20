import { atom } from 'jotai';

interface FormSubInfoProps {
  imageFiles: File[];
  isDistanceLapModified?: boolean;
}

const initialState = {
  imageFiles: [],
  isDistanceLapModified: false,
};

export const formSubInfoState = atom<FormSubInfoProps>(initialState);
