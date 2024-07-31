import { Directions } from '@/components/atoms';

export function getRotateDegree(direction: Directions) {
  if (direction === 'left') return 0;
  else if (direction === 'up') return 90;
  else if (direction === 'right') return 180;
  return 270;
}
