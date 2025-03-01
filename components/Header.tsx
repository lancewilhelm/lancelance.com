'use client'

import Link from "next/link";
import Logo from "./Logo";
import { robotoMono } from '@/utils/fonts'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  onHomePage?: boolean
}

interface NavItem {
  pathname: string
  text: string
}

export default function Header({ onHomePage = false }: HeaderProps) {
  const navItems: NavItem[] = [
    { pathname: '/blog', text: 'Blog' },
    { pathname: '/projects', text: 'Projects' },
    { pathname: '/about', text: 'About' }
  ]

  const currentPagePathname = usePathname()

  const isActivePage = (menuItemPathname: string) => {
    let isActiveClass = ''
    if (menuItemPathname.length > 1) {
      if (currentPagePathname.startsWith(menuItemPathname)) {
        isActiveClass = 'active'
      }
    } else {
      if (currentPagePathname === menuItemPathname) {
        isActiveClass = 'active'
      }
    }
    return isActiveClass
  }

  return (
    <header className='flex flex-col justify-center items-center col-start-[content-start] row-start-[header-start]'>
      <div className={onHomePage ? 'w-[300px]' : 'w-[150px] sm:w-[300px]'} id="logo">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className={`flex gap-[10px] justify-center font-mono text-md w-auto text-(--sub-color)${robotoMono.className}`} id="links">
        {navItems.map((item: NavItem, index: number) => (
          <span key={item.pathname} >
            {index > 0 && <span className='mr-[10px]'>|</span>}
            <Link href={item.pathname} className={isActivePage(item.pathname) ? 'underline text-[--text-color]' : 'no-underline'}>{item.text}</Link>
          </span>
        ))}
      </div>
    </header>
  )
}
