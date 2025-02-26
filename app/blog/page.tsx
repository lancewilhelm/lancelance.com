import { Metadata } from 'next'
import styles from './blog.module.css'
import Footer from '@/components/footer';
import Header from "@/components/header";

export const metadata: Metadata = {
  title: 'Blog | LanceLance',
  description: 'A personal blog for Lance Wilhelm',
}

export default function Blog() {
  return (
    <div className={styles.blogGrid}>
      <Header />
      <div className="flex flex-col items-center col-start-[content-start] row-start-[content-start]">
        Test
      </div>
      <Footer />
    </div>
  )
}
