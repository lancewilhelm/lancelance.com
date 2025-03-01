import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './scrollPages.module.css'

interface ScrollPagesLayoutProps {
  children: ReactNode
}

export default function ScrollPagesLayout({ children }: ScrollPagesLayoutProps) {
  return (
    <div className={`grid min-h-dvh ${styles.scrollPageGrid}`}>
      <Header />
      <main className='flex justify-center row-start-[content-start] col-start-[content-start] text-wrap overflow-x-hidden mb-2'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
