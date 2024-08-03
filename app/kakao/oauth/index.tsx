import dynamic from 'next/dynamic';

const DynamicKakaoOAuthPage = dynamic(() => import('./page'), { ssr: false });

export default function KakaoOAuthPage() {
  return <DynamicKakaoOAuthPage />;
}
