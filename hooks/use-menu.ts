'use client';

import { useState } from 'react';

/**
 * @description 메뉴를 조작하기 위해 사용합니다.
 *
 * 사용 방법
 * const [isOpen, open, close] = useMenu();
 *
 * return <Menu isOpen={isOpen} onClose={close}>
 */
export function useMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, open, close };
}
