"use client"
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Modal = ({ header, children, footer, wrapperClasses, open, onClose, isCenter, isBusy, showCloseIcon = false, loadingUI, noGap, headerClass = "p-4 bg-primary text-black font-semibold", footerClass }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountModal = () => setMounted(true);
    mountModal();
  }, []);

  if (!mounted || !open) return null;

  const modalContent = (
    <AnimatePresence>
      <section
        className={`fixed w-screen h-screen flex justify-center bg-black/50 top-0 left-0 z-50 px-2.5 md:px-12 p-5 ${isCenter ? 'items-center' : 'items-start'
          }`}
      >
        {/* Overlay */}
        <div
          className="absolute top-0 left-0 w-screen h-screen z-40 inset-2 bg-text/45"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className={`z-50 rounded-3xl relative overflow-hidden  ${wrapperClasses}`}
          initial={{ y: '-100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* Header */}
          {header ? (
            // <header className={`flex items-center ${headerClass} `}>
            //   <button className="rotate-180 mr-2 ml-0.5" onClick={onClose}>
            //     <Image
            //       src="/svg/up.svg"
            //       width={18}
            //       height={18}
            //       alt="Back icon"
            //       className="rotate-90"
            //     />
            //   </button>
            header
            // </header>
          ) : (
            <span className="rotate-180 m-2 self-start absolute z-10 cursor-pointer h-fit" onClick={onClose}>
              <ChevronRight size={30} className={'bg-secondary p-1.5  rounded-full'} />
            </span>
          )}

          {/* Loading UI */}
          {isBusy && (
            <div className="my-1">{loadingUI || 'Working please wait...'}</div>
          )}

          {/* Main Content */}
          <main
            className={`grow relative overflow-y-auto max-h-[75vh] thin-scrollbar ${isBusy || noGap ? 'p-0' : 'p-4'
              }`}
          >
            <div
              className={`absolute w-full h-full bg-white/50 cursor-wait ${isBusy ? 'block' : 'hidden'
                }`}
            />
            {children}
          </main>

          {/* Footer */}
          {footer && (
            // <footer className={`z-50 ${noGap ? '' : 'p-4'} ${footerClass}`}>
            footer
            // </footer>
          )}
        </motion.div>
      </section>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById('modal-root'));
};

export default Modal;
