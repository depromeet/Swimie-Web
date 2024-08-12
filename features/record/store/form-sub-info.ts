import { atom } from 'jotai';

interface FormSubInfoProps {
  imageFiles: File[];
}

const initialState = {
  imageFiles: [],
};

export const formSubInfoState = atom<FormSubInfoProps>(initialState);
