import type { MDXComponents } from 'mdx/types'
import BlogImage from '@/components/blogimage'
import { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (<BlogImage {...props as ImageProps} />),
    ...components,
  }
}
