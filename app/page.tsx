import { TextField } from '@/components/molecules/text-field';
import { css } from '@/styled-system/css';

const styles = css({
  w: 'full',
  h: 'full',
  fontSize: '40px',
  fontWeight: '600',
  color: 'green.70',
});

export default function Home() {
  return (
    <main className={styles}>
      <TextField unit="m" />
      2팀 웹 파이팅~~
    </main>
  );
}
