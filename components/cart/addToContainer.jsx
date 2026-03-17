'use client'
import { motion } from "framer-motion";
import { addProduct } from "lib/cart/cart.actions";
import { getCart } from "lib/cart/cart.core";
import { openCart } from "lib/cart/cart.ui";
import { Loader, Plus } from "lucide-react";
import { Suspense, useState } from "react";
import ContainerSelectionModal from "My_UI/product/ContainerSelectionModal";
import { useLanguage } from "lib/LanguageContext";


export default function AddToContainer({ item, isProductPage = false, callback }) {
    const [showModal, setShowModal] = useState(false);
    const { language } = useLanguage()
    const isSpanish = language === 'es'

    const t = {
        addToContainer: isSpanish ? "Añadir a Contenedor" : "Add to Container"
    }

    const handleAdd = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const currentCart = getCart();
        
        if (currentCart && currentCart.length > 0) {
            // Container exists, add to the last active container
            const targetContainer = currentCart[currentCart.length - 1];
            addProduct(targetContainer.id, {
                id: item.id || item.ID,
                name: item.name || item.Name,
                price: item.price || item.basePrice,
                image: item.image,
                dimensions: item.dimensions
            });
            // Open cart to show the filling process
            openCart();
            if (callback) callback();
        } else {
            // No container, ask for one time
            setShowModal(true);
        }
    }
    
    return (
        <>
            <motion.button
                onClick={handleAdd}
                aria-label={t.addToContainer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                ${isProductPage
                        ? 'w-full sm:w-auto py-3 px-6 rounded-lg text-base'
                        : 'w-full py-2.5 rounded-lg text-sm'
                    }
             bg-black text-white hover:bg-primary transition-all duration-300 ease-in cursor-pointer font-semibold flex items-center justify-center gap-2`} >
                <Plus className="w-4 h-4" />
                {t.addToContainer}
            </motion.button>
            <ContainerSelectionModal 
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    // Optionally open cart after adding from modal
                    if (getCart().length > 0) {
                        setTimeout(() => openCart(), 300);
                    }
                }}
                product={item}
            />
        </>
    )
}