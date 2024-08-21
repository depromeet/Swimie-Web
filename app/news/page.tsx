import { NewsList } from '@/features/news';
import { css } from '@/styled-system/css';

export default function NewsPage() {
  return (
    <section className={sectionStyle}>
      <NewsList />
    </section>
  );
}

const sectionStyle = css({
  px: '20px',
});
