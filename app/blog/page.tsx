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

export default function Blog() {
  const posts: Post[] = getBlogPosts('content/blog/', true)

  return (
    <div className={`w-screen min-h-dvh grid ${styles.blogGrid}`}>
      <Header />
      <div id="blog-list-container" className="flex flex-col w-full h-full col-start-[content-start] row-start-[content-start] text-wrap overflow-x-hidden items-center mb-2">
        <div id="blog-list" className="flex flex-col max-w-[700px] gap-[20px]">
          {posts.map((post: Post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className='no-underline'>
              <BlogCard title={post.metadata.title} description={post.metadata.description} date={post.metadata.date} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div >
  )
}
