import Image from 'next/image'

interface ImageProps {
  children: string
  src: string
  width: number
  height: number
  priority?: boolean
}

export default function BlogImage({ children, src, width, height, priority = false }: ImageProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {priority ? <Image src={src} alt={children} width={width} height={height} priority /> : <Image src={src} alt={children} width={width} height={height} />}
      <div className="italic text-center">{children}</div>
    </div>
  )
}
