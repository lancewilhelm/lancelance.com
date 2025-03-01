'use client'

import { useState, useRef, type PropsWithChildren } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import CopyIcon from '@/components/icons/copy';
import ThumbsUpIcon from '@/components/icons/thumbsup';

type PrePropsType = ComponentPropsWithoutRef<'pre'>;

interface PropsType extends PrePropsType {
  file: string
  language: string
  dataTheme: stringClappingIcon
  style: { backgroundColor: string, color: string }
  tabIndex: string
}

export default function Pre({ children, ...props }: PropsType) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  function copyCode() {
    if (!preRef.current) return;
    const codeElement = preRef.current.querySelector('code');
    if (!codeElement) return;
    navigator.clipboard.writeText(codeElement.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col my-[10px] sm:m-[10px]">
      <div className="flex flex-col">
        <div className="grid grid-cols-[min-content_max-content_auto_min-content] text-sm font-mono">
          {props.language && (
            <div className={`bg-[--main-color] text-[--bg-color] p-[5px] rounded-tl-[--border-radius] col-start-1 italic ${!props.file ? 'rounded-tr-[--border-radius]' : null}`}>
              {props.language}
            </div>
          )}
          {props.file && (
            <div className="bg-[--sub-color] text-[--text-color] p-[5px] rounded-tr-[--border-radius] col-start-2">
              {props.file}
            </div>
          )}
          <div
            className="flex justify-center w-[30px] items-center bg-[--main-color] text-[--bg-color] p-[5px] rounded-t-[--border-radius] col-start-4 cursor-pointer hover:bg-[--sub-color] transition-all duration-300 copy-code-btn"
            onClick={copyCode}
          >
            {copied ? <ThumbsUpIcon fill="var(--bg-color)" /> : <CopyIcon fill="var(--bg-color)" />}
          </div>
        </div>
      </div>
      <pre ref={preRef} {...props}>{children}</pre>
    </div>
  );
}
