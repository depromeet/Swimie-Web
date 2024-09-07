'use client';

import { useEffect, useRef } from 'react';

/**
 * @description 특정 컴포넌트의 외부 영역 클릭을 제어하기 위해 사용합니다.
 *
 * 사용 방법
 * const { isOpen, toggle, close } = useMenu();
 * const {ref} = useOutsideClick(isOpen, close);
 *
 * return <Menu ref={ref} isOpen={isOpen} onClose={close}>
 */
export default function useOutsideClick<U extends HTMLElement>(
  isOpen: boolean,
  onClose: () => void,
) {
  const ref = useRef<U>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isOpen) return;
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose, isOpen]);

  return { ref };
}
