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

            {/* Blog Grid */}
            <div className="container mx-auto px-4 py-16">
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
