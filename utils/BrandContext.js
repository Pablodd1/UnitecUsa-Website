"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BrandContext = createContext();

export const BRAND_CONFIG = {
    binw: {
        id: 'binw',
        name: "Building Innovation",
        logoText: "BINW",
        logoImage: "/logo.png",
        favicon: "/favicons/unitec-favicon.png",
        metaTitle: "UNITEC USA Design | Premium Building Solutions",
        colors: {
            primary: '#9EBECB',
            secondary: '#7296A4',
            accent: '#5A7A85',
        },
        email: "lidermercadeo@espaciosimportados.com.co",
        heroTagline: "Fill Your Container. Ship Your Way.",
        heroTagline_es: "Llena Tu Contenedor. Envía a Tu Manera.",
    },
    unitec: {
        id: 'unitec',
        name: "UNITEC USA Design",
        logoText: "UNITEC",
        logoImage: "/unitec-logo.png",
        favicon: "/favicons/unitec-favicon.png",
        metaTitle: "UNITEC USA Design | Premium Building Solutions",
        colors: {
            primary: '#1B3A4B',
            secondary: '#3D6B7E',
            accent: '#144552',
        },
        email: "lidermercadeo@espaciosimportados.com.co",
        heroTagline: "",
        heroTagline_es: "",
    }
};

export function BrandProvider({ children }) {
    const [activeBrand, setActiveBrand] = useState("unitec");

    // Persist brand choice (disabled for now to force unitec)
    useEffect(() => {
        // Force unitec regardless of saved preference
        setActiveBrand("unitec");
        localStorage.setItem('activeBrand', "unitec");
    }, []);

    const toggleBrand = () => {
        // Toggle is disabled, always stay on unitec
        setActiveBrand("unitec");
        localStorage.setItem('activeBrand', "unitec");
    };

    const brand = BRAND_CONFIG[activeBrand];

    // Apply CSS variables + favicon + title when brand changes
    useEffect(() => {
        if (brand?.colors) {
            document.documentElement.style.setProperty('--color-primary', brand.colors.primary);
            document.documentElement.style.setProperty('--color-secondary', brand.colors.secondary);
            document.documentElement.style.setProperty('--color-accent1', brand.colors.secondary);
            document.documentElement.style.setProperty('--color-accent2', brand.colors.accent);
        }
        // Swap favicon
        if (brand?.favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = brand.favicon;
        }
        // Update page title
        if (brand?.metaTitle) {
            document.title = brand.metaTitle;
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
