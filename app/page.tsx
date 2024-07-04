import { css } from '@/styled-system/css';

const styles = css({
  w: 'full',
  h: 'full',
  fontSize: '40px',
  fontWeight: '600',
  color: 'green.50',
});

export default function Home() {
  return <main className={styles}>2팀 웹 파이팅~~</main>;
}
