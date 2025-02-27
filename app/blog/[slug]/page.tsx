import Header from "@/components/header"
import styles from './blog.module.css'
import Footer from "@/components/footer"

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const slug = (await params).slug
  const { frontmatter: metadata, default: Post } = await import(`@/content/blog/${slug}.mdx`)
  console.log(metadata)

  return (
    <div className={`grid ${styles.blogGrid}`}>
      <Header />
      <div id='post-content' className='col-start-[content-start] row-start-[content-start] sm:px-4'>
        <div id='post-title' className='text-4xl'>{metadata.title}</div>
        <div id='post-date' className='pb-2 text-[--sub-color]'>
          {new Date(metadata.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className='flex flex-col gap-2'>
          <Post />
        </div>
      </div>
      <Footer />
    </div>
  )
}

// export function generateStaticParams() {
//   return [{ slug: 'blog/2024-11-14-rag_bot' }, { slug: 'about' }]
// }
//
// export const dynamicParams = true
