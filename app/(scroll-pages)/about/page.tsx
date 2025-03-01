import { Metadata } from 'next'
import Link from 'next/link'
import { robotoMono } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Projects | LanceLance',
  description: 'Projects for Lance Wilhelm',
}

export default function Blog() {
  return (
    <div id="about-container" className='flex flex-col gap-2 items-center'>
      <div id="about-list" className='flex flex-col sm:flex-row sm:gap-2 items-center'>
        <div>
          Shameless AI optimist.
        </div>
        <div>
          Apiring amateur athlete.
        </div>
        <div>
          Serial hobbyist.
        </div>
      </div>
      <Link href='https://lancewilhelm.com' className={robotoMono.className}>lancewilhelm.com</Link>
    </div>
  )
}
