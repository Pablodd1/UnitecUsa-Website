"use client";

import { createContext, useContext, useState, useEffect } from "react";
import translations from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children, initialLang = "es" }) {
    const [language, setLanguage] = useState(initialLang);

    useEffect(() => {
        const savedLang = localStorage.getItem("app-language");
        if (savedLang && (savedLang === "en" || savedLang === "es")) {
            setLanguage(savedLang);
        }
    }, []);

    const switchLanguage = (lang) => {
        if (lang === "en" || lang === "es") {
            setLanguage(lang);
            localStorage.setItem("app-language", lang);
        }
    };

    const t = (key, company = null) => {
        const keys = key.split('.');
        let value = translations[language];

        if (company && keys[0] !== 'company') {
            const companyKey = `company.${company}.${keys.join('.')}`;
            const companyValue = t(companyKey);
            if (companyValue !== companyKey) {
                return companyValue;
            }
        }

        for (const k of keys) {
            value = value?.[k];
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
