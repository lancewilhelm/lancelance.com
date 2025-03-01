import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer';
import Header from "@/components/header";
import styles from './about.module.css';
import { robotoMono } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Projects | LanceLance',
  description: 'Projects for Lance Wilhelm',
}

interface Post {
  title: string
  date: string
  description: string
  tags: string[]
  categories: string[]
}

export default function Blog() {
  // const posts: Post[] = getBlogPosts('content/blog/', true)

  return (
    <div className={`w-screen min-h-dvh grid ${styles.projectsGrid}`}>
      <Header />
      <div id="project-list-container" className="flex flex-col gap-2 w-full h-full col-start-[content-start] row-start-[content-start] text-wrap overflow-x-hidden items-center mb-2">
        <div id="project-list" className={`flex flex-col max-w-[700px] gap-[20px] ${robotoMono.className}`}>
          Shameless AI optimist. Apiring amateur athlete. Serial hobbyist.
        </div>
        <Link href='https://lancewilhelm.com' className={robotoMono.className}>lancewilhelm.com</Link>
      </div>
      <Footer />
    </div >
  )
}
