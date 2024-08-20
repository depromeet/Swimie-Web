import dynamic from 'next/dynamic';

const DynamicAppleOAuthPage = dynamic(() => import('.'), { ssr: false });

export default function AppleOAuthPage() {
  return <DynamicAppleOAuthPage />;
}
