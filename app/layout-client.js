'use client';

import { Suspense, useState, useEffect } from "react";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import Footer from "My_UI/footer/main";
import NavBar from "My_UI/navbar/main";
import CartInit from "lib/cart/initCart";
import CartDrawer from "My_UI/cart/CartDrawer.client";
import VirtualFrontDesk from "My_UI/ui/VirtualFrontDesk";
import LanguageSwitcher from "My_UI/ui/LanguageSwitcher";
import Providers from "./providers";
import Image from "next/image";

function SplashScreen({ showSplash, children }) {
  const [show, setShow] = useState(showSplash);
  const [fadeOut, setFadeOut] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (showSplash) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
      const hideTimer = setTimeout(() => setShow(false), 2500);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showSplash]);

  if (!show) return <>{children}</>;

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative w-40 h-40 mb-6">
        {imageError ? (
          <div className="flex items-center justify-center text-white text-2xl font-bold">
            UNITEC USA
          </div>
        ) : (
          <Image src="/unitec-logo.png" alt="UNITEC USA" fill className="object-contain" priority onError={() => setImageError(true)} />
        )}
      </div>
      <div className="w-48 h-0.5 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

const NotifyPortal = dynamic(() => import("lib/notify"), {
  ssr: false,
  loading: () => <Loader className="w-6 h-6 animate-spin" />
});

export default function RootLayoutClient({ children, lang, dict }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  return (
    <Providers lang={lang}>
      <SplashScreen showSplash={showSplash}>
        <NavBar lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
        <CartInit />
        <CartDrawer />
        <VirtualFrontDesk />
        <LanguageSwitcher currentLang={lang} />
        <div id="modal-root" />
        <div id="notify-container" />
        <Suspense fallback={<Loader className="w-6 h-6 animate-spin" />}>
          <NotifyPortal />
        </Suspense>
      </SplashScreen>
    </Providers>
  );
}
