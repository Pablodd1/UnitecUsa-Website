"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import translations from "./translations";

const LanguageContext = createContext();

function getLocaleFromPath(pathname) {
    if (!pathname) return null;
    if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
    if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
    return null;
}

export function LanguageProvider({ children, initialLang = "es" }) {
    const pathname = usePathname();
    const router = useRouter();
    const [language, setLanguage] = useState(() => {
        const pathLang = getLocaleFromPath(pathname);
        return pathLang || initialLang || "es";
    });

    useEffect(() => {
        const pathLang = getLocaleFromPath(pathname);
        if (pathLang) {
            setLanguage(pathLang);
            localStorage.setItem("app-language", pathLang);
            document.documentElement.lang = pathLang;
            return;
        }
        const savedLang = localStorage.getItem("app-language");
        if (savedLang && (savedLang === "en" || savedLang === "es")) {
            setLanguage(savedLang);
            document.documentElement.lang = savedLang;
        }
    }, [pathname]);

    const switchLanguage = (lang) => {
        if (lang !== "en" && lang !== "es") return;
        setLanguage(lang);
        localStorage.setItem("app-language", lang);
        if (typeof document !== "undefined") {
            document.documentElement.lang = lang;
            document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
        }

        if (typeof window !== "undefined") {
            const currentPath = window.location.pathname || "/";
            const search = window.location.search || "";
            const stripped = currentPath.replace(/^\/(es|en)(\/|$)/, "/");
            const normalized = stripped.startsWith("/") ? stripped : `/${stripped}`;
            const targetPath = normalized === "/" ? `/${lang}/` : `/${lang}${normalized}`;
            router.push(`${targetPath}${search}`);
        }
    };

    const t = (key, company = null) => {
        const keys = key.split(".");
        let value = translations[language];

        if (company && keys[0] !== "company") {
            const companyKey = `company.${company}.${keys.join(".")}`;
            const companyValue = t(companyKey);
            if (companyValue !== companyKey) {
                return companyValue;
            }
        }

        for (const k of keys) {
            value = value?.[k];
        }

        // Fallback to Spanish if key missing in active locale so raw key never leaks
        if (!value && language !== "es") {
            let fallbackVal = translations.es;
            for (const k of keys) {
                fallbackVal = fallbackVal?.[k];
            }
            if (fallbackVal) return fallbackVal;
        }

        return value || key;
    };

    const getCompanyText = (company, key) => {
        const companyKey = `company.${company}.${key}`;
        return t(companyKey);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t, getCompanyText }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
