'use client'

// import { useState } from 'react'
import Image from 'next/image'
// import Modal from '@/components/Modal'

interface ImageProps {
  children: string
  src: string
  width: number
  height: number
  priority?: boolean
}

export default function BlogImage({ children, src, width, height, priority = false }: ImageProps) {
  // const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col justify-center items-center gap-2 my-2">
      <div>
        {priority ? <Image src={src} alt={children} width={width} height={height} priority /> : <Image src={src} alt={children} width={width} height={height} />}
      </div>
      <div className="italic text-center">{children}</div>
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> */}
      {/*   <div onClick={() => setIsModalOpen(false)}> */}
      {/*     <Image src={src} alt={children} fill={true} objectFit='contain' style={{ padding: '50px' }} /> */}
      {/*   </div> */}
      {/* </Modal > */}
    </div >
  )
}
