import { useSetAtom } from 'jotai';
import { ReactNode } from 'react';

import { ToastType } from '@/components/atoms';
import { toastAtom } from '@/store';

type ToastOptions = {
  type?: ToastType;
  delay?: number;
};
const defaultOptions = {
  type: 'success',
  delay: 2000,
} as const;

/**
 * @description Toast를 조작하기 위해 사용합니다.
 *
 * 사용 방법은 아래와 같습니다.
 * const { toast } = useToast();
 *
 * toast('토스트 메세지', { type: 'success', delay: '300' })
 */
export const useToast = () => {
  const setToastState = useSetAtom(toastAtom);

  const toast = (content: ReactNode, options?: ToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    const { type, delay } = { ...defaultOptions, ...(options ?? {}) };

    setToastState(() => new Map([[id, { content, type }]]));

    setTimeout(() => {
      setToastState((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    }, delay);
  };

  return { toast } as const;
};
