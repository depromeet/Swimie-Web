import dynamic from 'next/dynamic';

const DynamicDeleteAccountPage = dynamic(() => import('.'), { ssr: false });

export default function DeleteAccountPage() {
  return <DynamicDeleteAccountPage />;
}
