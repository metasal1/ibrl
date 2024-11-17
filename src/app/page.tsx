"use client";

import dynamic from 'next/dynamic';
import StickerRibbon from './components/StickerRibbon';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Footer from './components/Footer';
const NetworkControls = dynamic(() => import('./components/NetworkControls'), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat text-white p-4 md:p-8">
        <StickerRibbon />

        {/* Background overlay for better text readability */}
        {/* <div className="fixed inset-0 bg-black/50 pointer-events-none" /> */}
        <div className="fixed" />

        {/* Decorative elements with new colors */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F74C30] rounded-full filter blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B2213] rounded-full filter blur-[150px]" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">

          <Header />
          <CustomCursor />
          <NetworkControls />
        </div>
        <Footer />
      </div>
    </>
  );
}
