import type { MDXComponents } from 'mdx/types'
import Pre from '@/components/Pre'
import Table from '@/components/Table'
import HTag from '@/components/HTag'
import { ComponentPropsWithoutRef } from 'react'

import type { PrePropsType } from '@/components/Pre'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'> & PrePropsType) => (
      <Pre {...props}>{children}</Pre>
    ),
    table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
      <Table {...props}>{children}</Table>
    ),
    h1: ({ children, id, ...props }: ComponentPropsWithoutRef<'h1'>) => (
      <HTag {...props} id={id ? id : ''}>
        <h1 id={id}>{children}</h1>
      </HTag>
    ),
    h2: ({ children, id, ...props }: ComponentPropsWithoutRef<'h2'>) => (
      <HTag {...props} id={id ? id : ''}>
        <h2 id={id}>{children}</h2>
      </HTag>
    ),
    h3: ({ children, id, ...props }: ComponentPropsWithoutRef<'h3'>) => (
      <HTag {...props} id={id ? id : ''}>
        <h3 id={id}>{children}</h3>
      </HTag>
    ),
    h4: ({ children, id, ...props }: ComponentPropsWithoutRef<'h4'>) => (
      <HTag {...props} id={id ? id : ''}>
        <h4 id={id}>{children}</h4>
      </HTag>
    ),
    h5: ({ children, id, ...props }: ComponentPropsWithoutRef<'h5'>) => (
      <HTag {...props} id={id ? id : ''}>
        <h5 id={id}>{children}</h5>
      </HTag>
    ),
    h6: ({ children, id, ...props }: ComponentPropsWithoutRef<'h6'>) => (
      <HTag {...props} id={id ? id : ''}>
        <h6 id={id}>{children}</h6>
      </HTag>
    ),
    ...components,
  }
}
