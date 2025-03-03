'use client'
import { useState } from "react";
import { PropsWithChildren } from "react";
import ChainlinkIcon from '@/components/icons/Chainlink';
import ThumbsUpIcon from '@/components/icons/Thumbsup';

interface HTagProps extends PropsWithChildren {
  id: string
}

export default function H2({ children, id }: HTagProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  function copyHeaderLink() {
    const baseUrl = window.location.origin + window.location.pathname
    const fullUrl = `${baseUrl}#${id}`
    navigator.clipboard.writeText(fullUrl)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className='flex items-center gap-2' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && (copied ? <ThumbsUpIcon fill='var(--main-color)' /> : <ChainlinkIcon fill='var(--main-color)' className='cursor-pointer' onClick={() => copyHeaderLink()} />)}
    </div>
  );
}
