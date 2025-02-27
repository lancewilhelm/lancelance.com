import Image from 'next/image'
import { ReactNode } from 'react'

interface ImageProps {
  children: string
  src: string
  width: number
}

export default function BlogImage({ children, src, width }: ImageProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Image src={src} alt={children} width={width} height={0} />
      <div className="italic">{children}</div>
    </div>
  )
}
