"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBlogs } from 'lib/blogService';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';

export default function BlogListingPage() {
    const blogs = getBlogs();
    const { language } = useLanguage();
    const isSpanish = language === 'es';

    const t = {
        title: isSpanish ? "Nuestro Blog" : "Our Blog",
        subtitle: isSpanish ? "Ideas, Tendencias y Consejos sobre Construcción y Diseño" : "Insights, Trends, and Tips on Construction and Design",
        readMore: isSpanish ? "Leer más" : "Read more",
        author: isSpanish ? "Por" : "By"
    };

    return (
        <main className="w-full bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section 
                className="bg-cover bg-center bg-no-repeat relative py-24 text-white"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/raster/top.jpg)' }}
            >
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-4 uppercase tracking-wider"
                    >
                        {t.title}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Revista Innovacion Constructiva Interactive Section */}
            <section className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-10"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
                        <div>
                            <span className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                                {isSpanish ? "Publicación Destacada" : "Featured Publication"}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                {isSpanish ? "Revista Innovación Constructiva" : "Constructive Innovation Magazine"}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl">
                                {isSpanish 
                                    ? "Descubre nuestra nueva edición digital interactiva: tendencias globales en arquitectura, soluciones avanzadas en PVC, WPC, paneles estructurales y tecnología para la construcción." 
                                    : "Explore our latest digital interactive edition: global architectural trends, advanced PVC & WPC solutions, structural panels, and modern construction technologies."}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a 
                                href="https://online.fliphtml5.com/unitecusadesign/vsck/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                            >
                                <span>{isSpanish ? "Ver en Pantalla Completa" : "Full Screen View"}</span>
                                <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* FlipHTML5 Interactive Embed Container */}
                    <div className="w-full relative rounded-2xl overflow-hidden bg-gray-900 shadow-inner aspect-[4/3] sm:aspect-[16/10] md:h-[650px]">
                        <iframe 
                            src="https://online.fliphtml5.com/unitecusadesign/vsck/" 
                            title="Revista Innovación Constructiva"
                            seamless 
                            scrolling="no" 
                            frameBorder="0" 
                            allowTransparency="true" 
                            allowFullScreen={true}
                            className="w-full h-full border-0 absolute inset-0"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Blog Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.article 
                            key={blog.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
                        >
                            <Link href={`/blog/${blog.slug}`} className="relative h-56 w-full block overflow-hidden group">
                                <Image 
                                    src={blog.image} 
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    {blog.category}
                                </div>
                            </Link>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {blog.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User size={14} />
                                        {blog.author}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                                </h2>
                                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                                    {blog.excerpt}
                                </p>
                                <Link 
                                    href={`/blog/${blog.slug}`}
                                    className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all"
                                >
                                    {t.readMore}
                                    <ChevronRight size={16} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </main>
    );
}
