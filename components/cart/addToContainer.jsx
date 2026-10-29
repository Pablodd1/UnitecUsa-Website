'use client';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";

export default function AddToContainer({ item, isProductPage = false }) {
    const router = useRouter();
    const { language } = useLanguage();
    const isSpanish = language === 'es';

    const t = {
        addToContainer: isSpanish ? "Añadir a Contenedor" : "Add to Container"
    };

    const handleClick = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        router.push(`/seleccion-de-contenedores?product=${item.id || item.ID || item.slug}`);
    };

    return (
        <motion.button
            onClick={handleClick}
            aria-label={t.addToContainer}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
            ${isProductPage
                    ? 'w-full sm:w-auto py-3 px-6 rounded-lg text-base'
                    : 'w-full py-2.5 rounded-lg text-sm'
                }
            bg-black text-white hover:bg-primary transition-all duration-300 ease-in cursor-pointer font-semibold flex items-center justify-center gap-2`}
        >
            <Plus className="w-4 h-4" />
            {t.addToContainer}
        </motion.button>
    );
}
