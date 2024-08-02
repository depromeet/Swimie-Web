type GetTime = {
  timeStr: string;
  type?: 'number' | 'string';
};

/**
 * 주어진 시간 문자열을 형식화하여 반환합니다.
 *
 * @param {string} params.timeStr - 형식화할 시간 문자열
 * @param {'number' | 'string'} params.type - 반환 값 타입
 * @returns {Object} 시간 객체 (시간, 분, 초)
 */
export const getFormatTime = ({ timeStr, type = 'number' }: GetTime) => {
  const [hour, minute, second] = timeStr.split(':');
  const hourNum = parseInt(hour, 10);
  const minuteNum = parseInt(minute, 10);
  const secondNum = parseInt(second, 10);

  const isTypeNumber = type === 'number';
  return {
    hour: isTypeNumber ? hourNum : hour,
    minute: isTypeNumber ? minuteNum : minute,
    second: isTypeNumber ? secondNum : second,
  };
};
