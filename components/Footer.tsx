'use client';

import { useState } from 'react'
import Modal from '@/components/Modal'
import ThemePicker from "./ThemePicker";
import PaletteIcon from '@/components/icons/Palette'
import GithubIcon from '@/components/icons/Github'
import Link from 'next/link'

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <footer className="flex gap-2 justify-center items-center col-start-[content-start] row-start-[footer-start]">
      <div className="icon cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <PaletteIcon fill="var(--main-color)" />
      </div>
      <Link href='https://github.com/lancewilhelm'>
        <GithubIcon fill="var(--main-color)" />
      </Link>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ThemePicker />
      </Modal>
    </footer>
  )
}
