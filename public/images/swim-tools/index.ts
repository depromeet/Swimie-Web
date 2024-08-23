import { StaticImageData } from 'next/image';

import LongFin from './long-fin.png';
import Paddle from './paddle.png';
import ShortFin from './short-fin.png';
import Snorkel from './snorkel.png';

export type SwimToolName = '롱핀' | '패들' | '숏핀' | '스노쿨';
export const SwimToolImages: {
  [key in SwimToolName]: StaticImageData;
} = {
  롱핀: LongFin,
  패들: Paddle,
  숏핀: ShortFin,
  스노쿨: Snorkel,
} as const;
