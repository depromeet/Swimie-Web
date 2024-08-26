import { StaticImageData } from 'next/image';

import BlueHat from './blue-hat.png';
import GreenHat from './green-hat.png';
import OrangeHat from './orange-hat.png';
import YellowHat from './yellow-hat.png';

export type ProfileIndexType = 0 | 1 | 2 | 3;
export const defaultProfileImages: {
  [key in ProfileIndexType]: StaticImageData;
} = {
  0: BlueHat,
  1: OrangeHat,
  2: GreenHat,
  3: YellowHat,
} as const;
