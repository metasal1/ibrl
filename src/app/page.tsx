"use client";

import dynamic from 'next/dynamic';
const NetworkControls = dynamic(() => import('./components/NetworkControls'), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <NetworkControls />
    </>
  );
}
