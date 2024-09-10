import { atom } from 'jotai';

interface FormSubInfoProps {
  imageFiles: File[];
  isDistanceLapModified?: boolean;
  isPrevImageFileDeleted?: boolean;
}

const initialState = {
  imageFiles: [],
  isDistanceLapModified: false,
  isPrevImageFileDeleted: false,
};

export const formSubInfoState = atom<FormSubInfoProps>(initialState);
