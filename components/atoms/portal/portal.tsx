import { createPortal } from 'react-dom';

export const Portal = ({ children }: { children: JSX.Element }) => {
  if (typeof window === 'undefined') return null;

  const target = document.querySelector('body') as HTMLBodyElement;
  return createPortal(children, target);
};
