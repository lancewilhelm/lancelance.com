import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Link from 'next/link'
import styles from './blog.module.css'
import Footer from '@/components/footer';
import Header from "@/components/header";
import BlogCard from '@/components/blogcard';
import { getBlogPosts } from '@/utils/blog';

export const metadata: Metadata = {
  title: 'Blog | LanceLance',
  description: 'A personal blog for Lance Wilhelm',
}

interface Post {
  title: string
  date: string
  description: string
  tags: string[]
  categories: string[]
}

const BLOG_CONTENT_PATH = 'content/blog'

export default function Blog() {
  const posts: Post[] = getBlogPosts('content/blog/', true)

  return (
    <div className={styles.blogGrid}>
      <Header />
      <div className="flex flex-col col-start-[content-start] row-start-[content-start] max-w-[700px] gap-[20px]">
        {posts.map((post: Post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <BlogCard title={post.metadata.title} description={post.metadata.description} date={post.metadata.date} />
          </Link>
        ))}
      </div>
      <Footer />
    </div >
  )
}
