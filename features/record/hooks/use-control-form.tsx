'use client';

import { useEffect, useState } from 'react';

import { RecordRequestProps } from '../apis';
import { MemoryPullResponse } from '../apis/dto/memory';

export function useControlForm(data?: MemoryPullResponse) {
  const [defaultFormData, setDefaultFormData] = useState<RecordRequestProps>({
    recordAt: '',
    startTime: '',
    endTime: '',
    lane: 25,
    strokes: [],
    imageIdList: [],
  });

  useEffect(() => {
    if (data) {
      setDefaultFormData({
        recordAt: data.data.recordAt,
        startTime: data.data.startTime,
        endTime: data.data.endTime,
        lane: data.data.lane,
        strokes: [],
        imageIdList: [],
      });
    }
  }, [data]);

  return { defaultFormData };
}
