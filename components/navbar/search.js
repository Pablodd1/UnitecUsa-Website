"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";

export default function SearchForm({ full = false, query: q, className = "" }) {
    const { t } = useLanguage();
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/collections/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className={`relative w-full ${className} ${full ? 'max-w-xl' : 'hidden sm:block max-w-xs'}`}>
            <Search className={`absolute text-secondary w-5 h-5 left-3 top-1/2 -translate-y-1/2`} />
            <input
                type="search"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                value={q || query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("search.placeholder") || "Search products..."}
                className={`w-full ${full ? 'bg-white/95' : 'bg-accent1/75'} border border-transparent focus:border-primary rounded-full py-3 pl-11 pr-5 text-sm text-black placeholder:text-gray-500 focus:outline-none shadow-sm transition-all`}
            />
        </div>
    );
}
