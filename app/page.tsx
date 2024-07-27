import { Calendar } from '@/features/main/calendar';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export default function Home() {
  return (
    <main className={styles}>
      <section className={calenderContentsStyles}>
        <Calendar />
      </section>
    </main>
  );
}

const styles = css({
  w: 'full',
  h: 'full',
});

const calenderContentsStyles = flex({
  padding: '16px 20px',
  gap: '16px',
});
