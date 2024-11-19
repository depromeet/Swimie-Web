import { css, cx } from '@/styled-system/css';

interface TextCounterProps {
  text: string;
  threshold: number;
  className?: string;
}

export function TextCounter({ text, threshold, className }: TextCounterProps) {
  return (
    <p className={cx(WordCounterStyle, className)}>
      {text.length} / {threshold}
    </p>
  );
}

const WordCounterStyle = css({
  textStyle: 'label1.normal',
  fontWeight: 500,
  color: 'text.alternative',
});
