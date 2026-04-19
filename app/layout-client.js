'use client';

import { Suspense, useState } from "react";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import Footer from "My_UI/footer/main";
import NavBar from "My_UI/navbar/main";
import CartInit from "lib/cart/initCart";
import CartDrawer from "My_UI/cart/CartDrawer.client";
import SplashScreen from "My_UI/ui/SplashScreen";
import Providers from "./providers";

const NotifyPortal = dynamic(() => import("lib/notify"), {
  ssr: false,
  loading: () => <Loader className="w-6 h-6 animate-spin" />
});

export default function RootLayoutClient({ children, lang, dict }) {
  return (
    <Providers lang={lang}>
      <SplashScreen />
      <NavBar lang={lang} dict={dict} />
      {children}
      <Footer lang={lang} dict={dict} />
      <CartInit />
      <CartDrawer />
      <div id="modal-root" />
      <div id="notify-container" />
      <Suspense fallback={<Loader className="w-6 h-6 animate-spin" />}>
        <NotifyPortal />
      </Suspense>
    </Providers>
  );
}