"use client";
import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addContainer, addOne } from 'lib/cart/cart.core';
import { generateID } from 'lib/misc';
import { ArrowRight, Package, Box as BoxIcon, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const CONTAINERS = [
  {
    id: "20ft",
    label: "20 FT Standard HC",
    description: "Compact & Efficient for regional logistics.",
    image: "/assets/containers/small_container_20ft_1774464400341.png",
    width: 2.35, height: 2.39, length: 5.9
  },
  {
    id: "40ft",
    label: "40 FT High Cube",
    description: "Maximum capacity for global distribution.",
    image: "/assets/containers/big_container_40ft_1774464416227.png",
    width: 2.35, height: 2.69, length: 12.03
  }
];

function ContainerSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const [loading, setLoading] = useState(false);

  const handleSelect = async (container) => {
    setLoading(true);
    const containerId = generateID();
    
    // Add the container first
    addContainer({
      id: containerId,
      name: container.label,
      dimension: { length: container.length, width: container.width, height: container.height }
    });

    // If there's a product, fetch its full data before adding
    if (productId) {
      try {
        const res = await fetch(`/API/products/${productId}`);
        if (res.ok) {
          const productData = await res.json();
          addOne(containerId, productData);
        } else {
          // Fallback if API fails
          addOne(containerId, { id: productId, name: "Product " + productId, price: 0 });
        }
      } catch (err) {
        console.error("Failed to fetch product for container", err);
        addOne(containerId, { id: productId, name: "Product " + productId, price: 0 });
      }
    }

    router.push('/cart');
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black overflow-hidden relative">
      <AnimatePresence>
        {loading && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white"
            >
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-bold tracking-widest uppercase">Initializing Container...</p>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-8 left-8 z-20">
          <h1 className="text-white text-2xl font-black italic tracking-tighter">B.I. <span className="text-blue-500 font-medium not-italic ml-1">LOGISTICS</span></h1>
      </div>

      {CONTAINERS.map((container, idx) => (
        <motion.div
          key={container.id}
          initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex-1 group cursor-pointer overflow-hidden border-r border-white/10 last:border-r-0"
          onClick={() => !loading && handleSelect(container)}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
            <Image 
                src={container.image} 
                alt={container.label} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 text-center">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.2 }}
            >
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <BoxIcon className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">
                        {container.id === '20ft' ? 'HC VOLUME 33 m³' : 'HC VOLUME 76 m³'}
                    </span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                  {container.label}
                </h2>
                
                <p className="text-gray-400 text-sm md:text-base max-w-sm mx-auto mb-8 font-medium">
                    {container.description}
                </p>

                <motion.button
                    className="relative overflow-hidden bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-shadow group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Prepare Cargo</span> 
                  <ArrowRight size={18} className="relative z-10" />
                  <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
            </motion.div>
          </div>

          {/* Side Info Badge */}
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 rotate-90 origin-right opacity-0 group-hover:opacity-40 transition-opacity">
              <span className="text-white text-[80px] font-black tracking-tighter leading-none select-none">
                  {container.id.toUpperCase()}
              </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ContainerSelectionPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>}>
      <ContainerSelectionContent />
    </Suspense>
  );
}