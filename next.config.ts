import type { NextConfig } from "next";
//
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMath from 'remark-math'
import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import type { RehypeShikiOptions } from "@shikijs/rehype";
import { visit } from 'unist-util-visit'
import { processMeta } from '@/utils/shiki'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
};

const rehypeShikiOptions: RehypeShikiOptions = {
  theme: 'one-dark-pro',
  transformers: [processMeta()]
}

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    elementAttributeNameCase: 'react',
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMath], // Remark plugins
    rehypePlugins: [[rehypeShiki, rehypeShikiOptions], rehypeKatex, rehypeSlug], // Rehype plugins
  },
})

export default withMDX(nextConfig);
