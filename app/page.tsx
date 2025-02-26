import { Metadata } from 'next'
import styles from './home.module.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Home | LanceLance',
  description: 'A personal blog and project collection for Lance Wilhelm',
}

export default function Home() {
  return (
    <div className={styles.homeGrid}>
      <Header />
      <Footer />
    </div>
  )
}
