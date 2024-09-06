'use client';

import { useMutation } from '@tanstack/react-query';

import { ReasonCode } from '../types';

const fetchReport = async (memoryId: number, reasonCode: ReasonCode) => {
  const res = await fetch(`/api/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      memoryId,
      reasonCode,
    }),
  });

  return res.json();
};

export type ReportRequest = {
  memoryId: number;
  reasonCode: ReasonCode;
};
export const useReport = () => {
  const mutate = useMutation({
    mutationFn: ({ memoryId, reasonCode }: ReportRequest) =>
      fetchReport(memoryId, reasonCode),
  });

  return {
    ...mutate,
  };
};
