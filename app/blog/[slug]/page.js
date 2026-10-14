import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from 'lib/blogService';
import { Calendar, ChevronLeft, MessageCircle, MapPin, Tag, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
    const blogs = getBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const blog = getBlogBySlug(resolvedParams.slug);

    if (!blog) {
        return {
            title: 'Artículo no encontrado | UNITEC',
        };
    }

    const metaTitle = blog.metaTitle || `${blog.title} | UNITEC`;
    const metaDescription = blog.metaDescription || blog.excerpt;
    const canonicalUrl = `https://unitecusadesign.com/blog/${blog.slug}`;
    const ogImage = blog.image?.startsWith('http')
        ? blog.image
        : `https://unitecusadesign.com${blog.image}`;

    return {
        title: {
            absolute: metaTitle,
        },
        description: metaDescription,
        keywords: blog.keywords || undefined,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: canonicalUrl,
            type: 'article',
            publishedTime: blog.date,
            modifiedTime: blog.dateModified || blog.date,
            authors: [blog.author || 'UNITEC USA Design'],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: blog.imageAlt || blog.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: [ogImage],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const resolvedParams = await params;
    const blog = getBlogBySlug(resolvedParams.slug);

    if (!blog) {
        notFound();
    }

    const baseUrl = 'https://unitecusadesign.com';
    const fullImageUrl = blog.image?.startsWith('http') ? blog.image : `${baseUrl}${blog.image}`;

    const structuredData = blog.schemaGraph || {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.metaDescription || blog.excerpt,
                "image": fullImageUrl,
                "datePublished": blog.date,
                "dateModified": blog.dateModified || blog.date,
                "inLanguage": "es",
                "author": {
                    "@type": "Organization",
                    "name": "UNITEC USA Design",
                    "url": baseUrl
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "UNITEC USA Design",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.unitecusadesign.com/unitec-logo.png"
                    }
                },
                "mainEntityOfPage": `${baseUrl}/blog/${blog.slug}`,
                ...(blog.keywords ? { "keywords": blog.keywords } : {})
            },
            ...(blog.faqs && blog.faqs.length > 0 ? [
                {
                    "@type": "FAQPage",
                    "mainEntity": blog.faqs.map(faq => ({
                        "@type": "Question",
                        "name": faq.q,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.a
                        }
                    }))
                }
            ] : [])
        ]
    };

    return (
        <main className="w-full bg-white min-h-screen pb-20">
            {/* Structured Data JSON-LD for Google & AI (GEO) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Header / Back Link */}
            <div className="bg-gray-50 py-4 border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-semibold"
                    >
                        <ChevronLeft size={18} />
                        Volver al Blog
                    </Link>
                </div>
            </div>

            {/* Article Body */}
            <article className="max-w-4xl mx-auto px-4 pt-10 md:pt-14">
                {/* Category & Tags */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="bg-[#132c3f] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
                            {blog.category}
                        </span>
                        {blog.promoBadge && (
                            <span className="bg-emerald-600 text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
                                {blog.promoBadge}
                            </span>
                        )}
                    </div>

                    {/* Single H1 on the Page */}
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        {blog.title}
                    </h1>

                    {/* Author & Publication Date */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#132c3f] flex items-center justify-center text-white font-bold">
                                {(blog.author || 'U').charAt(0)}
                            </div>
                            <div>
                                <span className="block font-bold text-gray-900">{blog.author || 'UNITEC USA Design'}</span>
                                <span className="text-xs text-gray-400">Equipo Editorial & Técnico</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                            <Calendar size={16} className="text-emerald-700" />
                            <time dateTime={blog.date}>{blog.date}</time>
                        </div>
                    </div>
                </div>

                {/* Featured Cover Image (1200x630 proportion) */}
                <div className="relative aspect-[1200/630] w-full rounded-3xl overflow-hidden mb-10 shadow-xl border border-gray-100">
                    <Image
                        src={blog.image}
                        alt={blog.imageAlt || blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Lead Paragraph (Destacado) */}
                {blog.lead && (
                    <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-10 pl-5 border-l-4 border-emerald-700 bg-emerald-50/40 py-4 pr-4 rounded-r-2xl">
                        {blog.lead}
                    </p>
                )}

                {/* Main Article Content (Server-Rendered HTML with green H2s and bold H3s) */}
                <div
                    className="prose prose-lg max-w-none 
                        prose-headings:font-bold 
                        prose-h2:text-emerald-800 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:tracking-tight
                        prose-h3:text-gray-900 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:font-extrabold prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                        prose-a:text-emerald-700 prose-a:font-semibold prose-a:underline hover:prose-a:text-emerald-900
                        prose-strong:text-gray-900 prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Project / Showroom Image Gallery (if provided) */}
                {blog.gallery && blog.gallery.length > 0 && (
                    <section className="my-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6 tracking-tight">
                            Aplicaciones Reales y Referencias UNITEC
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {blog.gallery.map((item, idx) => (
                                <figure key={idx} className="group rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <figcaption className="p-4 text-xs md:text-sm text-gray-600 font-medium bg-white">
                                        {item.alt}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {/* Direct WhatsApp & Showroom CTA Banner */}
                <section className="my-12 rounded-3xl bg-gradient-to-br from-[#132c3f] to-[#1e425e] text-white p-8 md:p-10 shadow-xl">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                            Promoción Octubre 2026 · 15 % DTO
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Cotice directamente con nuestro equipo técnico y comercial
                        </h2>
                        <p className="text-gray-200 text-sm md:text-base mb-6 leading-relaxed">
                            Del 1 al 31 de octubre de 2026 aproveche el 15 % de descuento en todas las referencias de láminas de mármol PVC y paneles WPC de interior. Atención directa en Colombia y Estados Unidos.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://wa.me/573142332147"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
                            >
                                <MessageCircle size={18} />
                                WhatsApp Colombia (+57 314 233 2147)
                            </a>
                            <a
                                href="https://wa.me/13054233147"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-100 text-[#132c3f] font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
                            >
                                <MessageCircle size={18} />
                                WhatsApp EE. UU. (+1 305 423 3147)
                            </a>
                            <Link
                                href="/colecciones/interior"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all"
                            >
                                Ver Colección de Interiores
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-gray-300">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-emerald-400" />
                                Showroom Medellín: C.C. IDEO Itagüí (Cra 42, Auto. S #75-83)
                            </span>
                            <span>•</span>
                            <span>Sede EE. UU.: Doral, Miami, FL</span>
                        </div>
                    </div>
                </section>

                {/* Full Open FAQ Section (No Accordions or Tabs - 100% Visible for SEO & AI GEO) */}
                {blog.faqs && blog.faqs.length > 0 && (
                    <section className="my-14 pt-10 border-t border-gray-200">
                        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-8 tracking-tight">
                            Preguntas Frecuentes
                        </h2>
                        <div className="space-y-6">
                            {blog.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs"
                                >
                                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2">
                                        {faq.q}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-base">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Article Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                        <Tag size={16} className="text-gray-400 mr-1" />
                        {blog.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#132c3f] hover:text-emerald-700 uppercase tracking-widest transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Ver todos los artículos del Blog
                    </Link>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 uppercase tracking-widest transition-colors"
                    >
                        Visitar Showroom y Contacto
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </article>
        </main>
    );
}
