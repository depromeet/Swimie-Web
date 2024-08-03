import dynamic from 'next/dynamic';

const DynamicKakaoOAuthPage = dynamic(() => import('.'), { ssr: false });

export default function KakaoOAuthPage() {
  return <DynamicKakaoOAuthPage />;
}
