"use client";

import { createContext, useContext, useState, useEffect } from "react";
import siteSettings from "lib/siteSettings";

const BrandContext = createContext();

export const BRAND_CONFIG = {
    binw: {
        id: 'binw',
        name: siteSettings.brand_name,
        shortName: siteSettings.brand_name,
        logoText: "UNITEC",
        logoImage: "/unitec-logo.png",
        favicon: "/favicons/unitec-favicon.png",
        metaTitle: `${siteSettings.brand_name} | Premium Building Solutions`,
        colors: {
            primary: '#1B3A4B',
            secondary: '#3D6B7E',
            accent: '#144552',
        },
        email: siteSettings.public_email,
        phone: siteSettings.primary_phone,
        whatsapp: siteSettings.primary_whatsapp,
        heroTagline: "Fill Your Container. Ship Your Way.",
        heroTagline_es: "Llena Tu Contenedor. Envía a Tu Manera.",
    },
    unitec: {
        id: 'unitec',
        name: siteSettings.brand_name,
        shortName: siteSettings.brand_name,
        logoText: "UNITEC",
        logoImage: "/unitec-logo.png",
        favicon: "/favicons/unitec-favicon.png",
        metaTitle: `${siteSettings.brand_name} | Premium Building Solutions`,
        colors: {
            primary: '#1B3A4B',
            secondary: '#3D6B7E',
            accent: '#144552',
        },
        email: siteSettings.public_email,
        phone: siteSettings.primary_phone,
        whatsapp: siteSettings.primary_whatsapp,
        heroTagline: "",
        heroTagline_es: "",
    }
};

export function BrandProvider({ children }) {
    const [activeBrand, setActiveBrand] = useState("unitec");

    useEffect(() => {
        setActiveBrand("unitec");
        localStorage.setItem('activeBrand', "unitec");
    }, []);

    const toggleBrand = () => {
        setActiveBrand("unitec");
        localStorage.setItem('activeBrand', "unitec");
    };

    const brand = BRAND_CONFIG[activeBrand];

    useEffect(() => {
        if (brand?.colors) {
            document.documentElement.style.setProperty('--color-primary', brand.colors.primary);
            document.documentElement.style.setProperty('--color-secondary', brand.colors.secondary);
            document.documentElement.style.setProperty('--color-accent1', brand.colors.secondary);
            document.documentElement.style.setProperty('--color-accent2', brand.colors.accent);
        }
        if (brand?.favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = brand.favicon;
        }
    }, [brand]);

    return (
        <BrandContext.Provider value={{ activeBrand, toggleBrand, brand }}>
            {children}
        </BrandContext.Provider>
    );
}

export function useBrand() {
    return useContext(BrandContext);
}
