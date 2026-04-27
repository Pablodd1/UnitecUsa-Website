import blogs from '../static_data/blogs_es.json';

export function getBlogs() {
    return blogs;
}

export function getBlogBySlug(slug) {
    return blogs.find(blog => blog.slug === slug);
}
