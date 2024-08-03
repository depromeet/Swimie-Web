import dynamic from 'next/dynamic';

const DynamicGoogleOAuthPage = dynamic(() => import('.'), { ssr: false });

export default function GoogleOAuthPage() {
  return <DynamicGoogleOAuthPage />;
}
