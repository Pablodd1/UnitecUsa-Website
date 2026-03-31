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
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function SplashScreen({ showSplash, children }) {
  const [show, setShow] = useState(showSplash);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (!show) return <>{children}</>;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48"
        >
          <Image src="/logo.png" alt="UNITEC USA" fill className="object-contain" priority />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mt-8 rounded-full"
        />
      </motion.div>
    </AnimatePresence>
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