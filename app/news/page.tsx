import { GlobalNavigationBar } from '@/components/molecules';
import { NewsList } from '@/features/news';

export default function NewsPage() {
  return (
    <>
      <NewsList />

      <GlobalNavigationBar />
    </>
  );
}
