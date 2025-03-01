import { Metadata } from 'next'
import styles from './home.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Home | LanceLance',
  description: 'A personal blog and project collection for Lance Wilhelm',
}

export default function Home() {
  return (
    <div className={styles.homeGrid}>
      <Header onHomePage={true} />
      <Footer />
    </div>
  )
}
