'use client';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useBrand } from "lib/BrandContext";

export default function WhatsAppBubble() {
    const { activeBrand } = useBrand();

    // Select the phone number based on the active brand
    const phoneNumber = activeBrand === 'unitec' ? "573142332147" : "17869685783";
    const message = encodeURIComponent("Hello, I am interested in your products.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce-slow"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle size={32} fill="white" className="text-green-500" />
            <span className="absolute right-0 top-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
        </Link>
    );
}
