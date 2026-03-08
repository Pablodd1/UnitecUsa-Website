'use client'
import { motion } from "framer-motion";
import { addOne } from "lib/cart/cart.actions";
import { Loader, Plus } from "lucide-react";
import { Suspense, useState } from "react";
import ContainerModal from "./selectContainer";


export default function AddToContainer({ item, isProductPage = false, callback }) {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowModal(prev => {
            const next = !prev;
            return next;
        });
    }
    return (
        <>
            <motion.button
                onClick={toggleModal}
                aria-label="Add to Container"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                ${isProductPage
                        ? 'w-full sm:w-auto py-3 px-6 rounded-lg text-base'
                        : 'w-full py-2.5 rounded-lg text-sm'
                    }
             bg-black text-white hover:bg-primary transition-all duration-300 ease-in cursor-pointer font-semibold flex items-center justify-center gap-2`} >
                <Plus className="w-4 h-4" />
                Add to Container
            </motion.button>
            <ContainerModal {...{ showModal, toggleModal, item,  }} />
        </>
    )
}