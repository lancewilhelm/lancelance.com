import { Metadata } from 'next'
import path from 'node:path'
import fs from 'node:fs'
//
import Header from "@/components/header"
import styles from './blog.module.css'
import Footer from "@/components/footer"

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

async function loadMdxFile(slug: string) {
  try {
    const mdxPath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
    if (!fs.existsSync(mdxPath)) {
      return null
    }
    const mdxModule = await import(`@/content/blog/${slug}.mdx`)
    return mdxModule
  } catch (error) {
    console.error('Failed to load MDX file:', error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const slug = (await params).slug
  const mdxModule = await loadMdxFile(slug)
  const { metadata } = mdxModule
  return {
    title: `${metadata.title} | LanceLance`,
    description: metadata.description,
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const slug = (await params).slug
  const mdxModule = await loadMdxFile(slug)
  const { metadata, default: Content } = mdxModule

  return (
    <div className={`grid ${styles.blogGrid}`}>
      <Header />
      <div id='post-content' className='col-start-[content-start] row-start-[content-start] sm:px-4'>
        <div id='post-title' className='text-4xl'>{metadata.title}</div>
        <div id='post-date' className='pb-2 text-[--sub-color]'>
          {new Date(metadata.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className='flex flex-col gap-2'>
          <Content />
        </div>
      </div>
      <Footer />
    </div>
  )
}
