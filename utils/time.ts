type GetTime = {
  timeStr: string;
  type?: 'number' | 'string';
};

/**
 * 주어진 시간 문자열을 형식화하여 반환합니다.
 *
 * @param {string} params.timeStr - 형식화할 시간 문자열
 * @param {'number' | 'string'} params.type - 반환 값 타입
 * @returns {Object} 시간 객체 (시간, 분)
 */
export const getFormatTime = ({ timeStr, type = 'number' }: GetTime) => {
  const [hour, minute] = timeStr.split(':');
  const isTypeNumber = type === 'number';

  return {
    hour: isTypeNumber ? parseInt(hour, 10) : hour,
    minute: isTypeNumber ? parseInt(minute, 10) : minute,
  };
};
