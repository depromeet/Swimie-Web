import { WarnIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export function RecordWarning() {
  return (
    <div className={layoutStyles.total}>
      <div className={layoutStyles.content}>
        <div className={layoutStyles.icon}>
          <WarnIcon />
        </div>
        <p className={descriptionStyles}>
          욕설, 비방 등 불쾌한 내용 또는 수영과 관련없는 기록은 서비스 이용에
          제재를 받을 수 있어요.
        </p>
      </div>
    </div>
  );
}

const layoutStyles = {
  total: css({
    padding: '0 20px',
  }),
  content: flex({
    justifyContent: 'space-between',
    backgroundColor: 'fill.normal',
    borderRadius: '10px',
    marginBottom: '24px',
    padding: '12px',
  }),
  icon: css({
    marginRight: '8px',
  }),
};

const descriptionStyles = css({
  textStyle: 'body2.normal',
  color: 'text.neutral',
  fontWeight: 500,
  wordBreak: 'keep-all',
});
