"use client";

import { useLanguage } from "lib/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
    const { language, switchLanguage } = useLanguage();

    const handleToggle = () => {
        const nextLang = language === "en" ? "es" : "en";
        switchLanguage(nextLang);
    };

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-primary/50 text-white transition-all duration-200 text-xs font-semibold cursor-pointer"
            title={language === "en" ? "Cambiar a Español (/es/)" : "Switch to English (/en/)"}
            aria-label={language === "en" ? "Cambiar a Español" : "Switch to English"}
        >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span className={language === "es" ? "text-white font-extrabold" : "text-slate-400"}>
                ES
            </span>
            <span className="text-slate-500">/</span>
            <span className={language === "en" ? "text-white font-extrabold" : "text-slate-400"}>
                EN
            </span>
        </button>
    );
}
