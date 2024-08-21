import { Directions } from '@/components/atoms';

export function getRotateDegree(direction: Directions) {
  if (direction === 'left') return 0;
  return 180;
}
