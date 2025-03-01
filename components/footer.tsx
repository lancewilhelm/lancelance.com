'use client';

import { useState } from 'react'
import Modal from '@/components/modal'
import ThemePicker from "./themepicker";
import PaletteIcon from '@/components/icons/palette'

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <footer className="flex justify-center items-center col-start-[content-start] row-start-[footer-start]">
      <div className="icon cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <PaletteIcon fill="var(--main-color)" />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ThemePicker />
      </Modal>
    </footer>
  )
}
