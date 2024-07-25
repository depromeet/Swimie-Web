'use client';

import { useState } from 'react';

export function UseSubInfoTextFields() {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeFieldsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handlers: { onChangeFieldsOpen } };
}
