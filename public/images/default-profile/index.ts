import { StaticImageData } from 'next/image';

import BlueHat from './blue-hat.png';
import GreenHat from './green-hat.png';
import OrangeHat from './orange-hat.png';
import YellowHat from './yellow-hat.png';

export type ProfileIndexType = 1 | 2 | 3 | 4;
export const defaultProfileImages: {
  [key in ProfileIndexType]: StaticImageData;
} = {
  1: BlueHat,
  2: OrangeHat,
  3: GreenHat,
  4: YellowHat,
} as const;
