import type { MDXComponents } from 'mdx/types'
import Pre from '@/components/pre'
import { ComponentPropsWithoutRef } from 'react'

import type { PrePropsType } from '@/components/pre'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'> & PrePropsType) => (
      <Pre {...props}>{children}</Pre>
    ),
    ...components,
  }
}
