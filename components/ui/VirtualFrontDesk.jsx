'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, PhoneCall, Sparkles, X, Bot, ChevronRight } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';
import siteSettings from 'lib/siteSettings';

const BASE_CHATBOT_URL = 'https://unitec-front-desk.vercel.app';

export default function VirtualFrontDesk() {
    const { language } = useLanguage();
    const isSpanish = language === 'es';
    const [isOpen, setIsOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [bubbleDismissed, setBubbleDismissed] = useState(false);
    const [activeIcon, setActiveIcon] = useState('chat');

    const [motionOffset, setMotionOffset] = useState({ x: 0, y: 0, rot: 0 });
    const mouseTarget = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });
    const scrollVelocity = useRef(0);
    const lastScrollY = useRef(0);
    const animFrameId = useRef(null);
    const buttonRef = useRef(null);

    const brandId = 'unitec';

    const copy = isSpanish
        ? {
            ariaRegion: 'Asistente Virtual',
            headerTitle: `Asistente Virtual ${siteSettings.brand_name}`,
            headerStatus: 'En línea • Chat y Llamada',
            closeAssistant: 'Cerrar asistente',
            openAssistant: 'Abrir asistente virtual para chatear o llamar',
            closeGreeting: 'Cerrar saludo',
            badge: 'Asistente IA',
            greetingTitle: '¿En qué podemos ayudarte?',
            greetingDesc: 'Asesoría en catálogos, cotizaciones por contenedor y dudas en tiempo real.',
            chatBtn: 'Chatear',
            callBtn: 'Llamar',
            pillPrefix: '¿Preguntas?',
            pillAction: 'Chatea o Llama',
        }
        : {
            ariaRegion: 'Virtual Assistant',
            headerTitle: `${siteSettings.brand_name} Virtual Assistant`,
            headerStatus: 'Online • Chat & Call',
            closeAssistant: 'Close assistant',
            openAssistant: 'Open virtual assistant to chat or call',
            closeGreeting: 'Dismiss greeting',
            badge: 'AI Assistant',
            greetingTitle: 'How can we help you?',
            greetingDesc: 'Catalog guidance, container quotes, and real-time support.',
            chatBtn: 'Chat',
            callBtn: 'Call',
            pillPrefix: 'Questions?',
            pillAction: 'Chat or Call',
        };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!bubbleDismissed) {
                setShowBubble(true);
            }
        }, 1800);

        return () => clearTimeout(timer);
    }, [bubbleDismissed]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIcon((prev) => (prev === 'chat' ? 'call' : 'chat'));
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isOpen || !buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const btnX = rect.left + rect.width / 2;
            const btnY = rect.top + rect.height / 2;

            const deltaX = e.clientX - btnX;
            const deltaY = e.clientY - btnY;
            const distance = Math.hypot(deltaX, deltaY);

            const radius = 420;
            if (distance < radius) {
                const pull = (1 - distance / radius) * 22;
                const angle = Math.atan2(deltaY, deltaX);
                mouseTarget.current = {
                    x: Math.cos(angle) * pull,
                    y: Math.sin(angle) * pull,
                };
            } else {
                mouseTarget.current = { x: 0, y: 0 };
            }
        };

        const handleScroll = () => {
            if (isOpen) return;
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;
            lastScrollY.current = currentScrollY;
            scrollVelocity.current = Math.max(-15, Math.min(15, delta * 0.35));
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        let startTime = performance.now();
        const animate = () => {
            const now = performance.now();
            const elapsed = (now - startTime) / 1000;

            const waveY = Math.sin(elapsed * 2.2) * 5;
            const waveX = Math.cos(elapsed * 1.6) * 4;
            const waveRot = Math.sin(elapsed * 1.8) * 1.8;

            currentMouse.current.x += (mouseTarget.current.x - currentMouse.current.x) * 0.08;
            currentMouse.current.y += (mouseTarget.current.y - currentMouse.current.y) * 0.08;

            scrollVelocity.current *= 0.88;

            setMotionOffset({
                x: waveX + currentMouse.current.x,
                y: waveY + currentMouse.current.y + scrollVelocity.current,
                rot: waveRot + scrollVelocity.current * 0.3,
            });

            animFrameId.current = requestAnimationFrame(animate);
        };

        animFrameId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
        };
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
        setShowBubble(false);
    };

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
            setShowBubble(false);
        }
    };

    const handleDismissBubble = (e) => {
        e.stopPropagation();
        setShowBubble(false);
        setBubbleDismissed(true);
    };

    const motionTransform = isOpen
        ? 'none'
        : `translate3d(${motionOffset.x.toFixed(2)}px, ${motionOffset.y.toFixed(2)}px, 0) rotate(${motionOffset.rot.toFixed(2)}deg)`;

    return (
        <aside
            aria-label={copy.ariaRegion}
            className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[999999]"
        >
            {isOpen && (
                <div className="fixed bottom-[88px] right-4 sm:right-6 w-[420px] h-[700px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-115px)] rounded-[28px] overflow-hidden bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border border-slate-200/90 animate-in fade-in zoom-in-95 duration-200 z-[999999] flex flex-col">
                    <div className="bg-[#132c3f] text-white px-4 py-3 flex items-center justify-between border-b border-sky-900/40">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-sky-500/25 flex items-center justify-center border border-sky-400/30">
                                <Bot className="w-4 h-4 text-sky-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white leading-none">{copy.headerTitle}</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[11px] text-sky-300 font-medium leading-none">{copy.headerStatus}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            aria-label={copy.closeAssistant}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <iframe
                        src={`${BASE_CHATBOT_URL}?embed=true&brandId=${brandId}&lang=${language}`}
                        title={copy.headerTitle}
                        allow="clipboard-read; clipboard-write; microphone; autoplay"
                        className="w-full flex-1 border-none bg-slate-50"
                    />
                </div>
            )}

            {!isOpen && showBubble && (
                <div
                    onClick={handleOpen}
                    style={{ transform: motionTransform }}
                    className="absolute bottom-20 right-0 w-[310px] sm:w-[340px] p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_16px_40px_-10px_rgba(19,44,63,0.3)] border border-sky-200/90 cursor-pointer animate-in fade-in slide-in-from-bottom-3 duration-300 group hover:shadow-2xl transition-all"
                >
                    <button
                        onClick={handleDismissBubble}
                        className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label={copy.closeGreeting}
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#132c3f] to-sky-500 flex items-center justify-center text-white shadow-md">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-400/50" />
                        </div>

                        <div className="flex-1 pr-3">
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-black uppercase tracking-wider text-sky-600">{copy.badge}</span>
                                <Sparkles className="w-3 h-3 text-amber-500" />
                            </div>
                            <p className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                                {copy.greetingTitle}
                            </p>
                            <p className="text-xs text-slate-600 mt-1 leading-normal">
                                {copy.greetingDesc}
                            </p>

                            <div className="flex items-center gap-2 mt-3">
                                <button
                                    onClick={handleOpen}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
                                >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span>{copy.chatBtn}</span>
                                </button>
                                <button
                                    onClick={handleOpen}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132c3f] hover:bg-[#1a4260] text-white text-xs font-bold shadow-xs transition-colors"
                                >
                                    <PhoneCall className="w-3.5 h-3.5 text-sky-300" />
                                    <span>{copy.callBtn}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-sky-200/90" />
                </div>
            )}

            <div
                ref={buttonRef}
                style={{ transform: motionTransform }}
                className="relative flex items-center justify-end gap-2.5"
            >
                {!isOpen && !showBubble && (
                    <div
                        onClick={handleOpen}
                        className="cursor-pointer group/pill hidden sm:flex items-center gap-2.5 py-2 px-3.5 bg-white/90 hover:bg-white backdrop-blur-md border border-sky-200/80 rounded-full shadow-[0_8px_25px_-5px_rgba(2,132,199,0.25)] hover:shadow-[0_12px_32px_-5px_rgba(2,132,199,0.4)] transition-all duration-300"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-800">
                            {copy.pillPrefix}{' '}
                            <span className="text-sky-600 font-extrabold group-hover/pill:underline">
                                {copy.pillAction}
                            </span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/pill:translate-x-0.5 transition-transform" />
                    </div>
                )}

                {!isOpen && (
                    <>
                        <span className="absolute -inset-2.5 rounded-full bg-sky-400/25 animate-ping pointer-events-none" />
                        <span className="absolute -inset-5 rounded-full border border-sky-400/20 animate-pulse pointer-events-none" />
                    </>
                )}

                <button
                    onClick={handleToggle}
                    className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#132c3f] via-[#1a4260] to-sky-500 text-white shadow-[0_10px_35px_rgba(2,132,199,0.4)] hover:shadow-[0_14px_42px_rgba(2,132,199,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-hidden"
                    aria-label={isOpen ? copy.closeAssistant : copy.openAssistant}
                >
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {isOpen ? (
                        <X className="w-7 h-7 text-white transition-transform duration-200 rotate-90 group-hover:rotate-0" />
                    ) : (
                        <div className="relative flex items-center justify-center w-full h-full">
                            <div className="transition-all duration-500 transform">
                                {activeIcon === 'chat' ? (
                                    <MessageCircle className="w-7 h-7 text-white drop-shadow-sm animate-in zoom-in-75 duration-300" />
                                ) : (
                                    <PhoneCall className="w-7 h-7 text-white drop-shadow-sm animate-in zoom-in-75 duration-300" />
                                )}
                            </div>

                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            </span>
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}
