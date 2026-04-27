"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getBlogBySlug } from 'lib/blogService';
import { Calendar, User, ChevronLeft, Share2 } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';

export default function BlogPostPage() {
    const { slug } = useParams();
    const router = useRouter();
    const blog = getBlogBySlug(slug);
    const { language } = useLanguage();
    const isSpanish = language === 'es';

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Blog not found</h1>
                    <Link href="/blog" className="text-primary hover:underline">Back to all blogs</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="w-full bg-white min-h-screen pb-20">
            {/* Header / Back Button */}
            <div className="bg-gray-50 py-4 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium"
                    >
                        <ChevronLeft size={18} />
                        {isSpanish ? "Volver al Blog" : "Back to Blog"}
                    </button>
                </div>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-4 pt-12">
                <div className="mb-8">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                        {blog.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {blog.author.charAt(0)}
                            </div>
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{blog.date}</span>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
                    <Image 
                        src={blog.image} 
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div 
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-black prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Footer Share */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Compartir:</span>
                        <div className="flex gap-2">
                            {['facebook', 'twitter', 'linkedin'].map(social => (
                                <button key={social} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                    <Share2 size={14} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <Link href="/blog" className="text-sm font-bold text-primary hover:underline uppercase tracking-widest">
                        {isSpanish ? "Ver más artículos" : "View more articles"}
                    </Link>
                </div>
            </article>
        </main>
    );
}
