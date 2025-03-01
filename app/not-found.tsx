import styles from './home.module.css'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function NotFound() {
  return (
    <div className={styles.homeGrid}>
      <div className="flex flex-col gap-[20px] justify-center items-center col-start-[content-start] row-start-[header-start]">
        <div className="w-[200px]">
          <Logo />
        </div>
        <div className='text-5xl font-mono'>404</div>
        <Link href="/" className="font-mono">return home</Link>
      </div>
    </div>
  )
}
