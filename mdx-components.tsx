import type { MDXComponents } from 'mdx/types'
import Pre from '@/components/Pre'
import Table from '@/components/Table'
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
    ...components,
  }
}
