'use client';

import { useState } from 'react';

/**
 * @description subInfo(심박수, 페이스, 칼로리) 필드 open 상태 관리 custom-hook
 */
export function UseSubInfoTextFields() {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeFieldsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handlers: { onChangeFieldsOpen } };
}
