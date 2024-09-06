import { WarnIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface RecordWarningProps {
  description: string;
}

export function RecordWarning({ description }: RecordWarningProps) {
  return (
    <div className={layoutStyles.total}>
      <div className={layoutStyles.content}>
        <div className={layoutStyles.icon}>
          <WarnIcon />
        </div>
        <p className={descriptionStyles}>{description}</p>
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
