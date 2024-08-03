import dynamic from 'next/dynamic';

const DynamicGoogleOAuthPage = dynamic(() => import('./page'), { ssr: false });

export default function GoogleOAuthPage() {
  return <DynamicGoogleOAuthPage />;
}
