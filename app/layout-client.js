'use client';

import { Suspense } from "react";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import Footer from "My_UI/footer/main";
import NavBar from "My_UI/navbar/main";
import CartInit from "lib/cart/initCart";
import CartDrawer from "My_UI/cart/CartDrawer.client";
import WhatsAppBubble from "My_UI/ui/whatsapp_bubble";
import VirtualFrontDesk from "My_UI/ui/VirtualFrontDesk";
import LanguageSwitcher from "My_UI/ui/LanguageSwitcher";
import Providers from "./providers";

const NotifyPortal = dynamic(() => import("lib/notify"), {
  ssr: false,
  loading: () => <Loader className="w-6 h-6 animate-spin" />
});

export default function RootLayoutClient({ children, lang, dict }) {
  return (
    <Providers>
      <NavBar lang={lang} dict={dict} />
      {children}
      <Footer lang={lang} dict={dict} />
      <CartInit />
      <CartDrawer />
      <WhatsAppBubble />
      <VirtualFrontDesk />
      <LanguageSwitcher currentLang={lang} />
      <div id="modal-root" />
      <div id="notify-container" />
      <Suspense fallback={<Loader className="w-6 h-6 animate-spin" />}>
        <NotifyPortal />
      </Suspense>
    </Providers>
  );
}