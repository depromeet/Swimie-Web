import { StaticImageData } from 'next/image';

import BlueHat from './blue-hat.png';
import GreenHat from './green-hat.png';
import OrangeHat from './orange-hat.png';
import YellowHat from './yellow-hat.png';

export type hatColors = '파랑' | '주황' | '초록' | '노랑';
export const defaultProfileIcons: {
  [key in hatColors]: StaticImageData;
} = {
  파랑: BlueHat,
  주황: OrangeHat,
  초록: GreenHat,
  노랑: YellowHat,
} as const;
