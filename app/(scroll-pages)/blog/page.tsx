import { Metadata } from 'next'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard';
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

export default async function Blog() {
  const posts: ({ metadata: Post, slug: string } | null)[] = await getBlogPosts(true)
  posts.sort((a, b) => {
    return new Date(b?.metadata.date ?? 0).getTime() - new Date(a?.metadata.date ?? 0).getTime()
  })

  return (
    <div id='blog-list-container' className='flex flex-col items-center'>
      <div id='blog-list' className='flex flex-col max-w-[700px] gap-[20px]'>
        {posts.map((post) => {
          if (post) return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className='no-underline'>
              <BlogCard title={post.metadata.title} description={post.metadata.description} date={post.metadata.date} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
