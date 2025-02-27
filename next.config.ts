import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypePrettyCode from 'rehype-pretty-code';
// import rehypeMdxImportMedia from 'rehype-mdx-import-media';

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
};

const remarkGFMOptions = {
}

const rehypePrettyPrintOptions = {
  theme: 'one-dark-pro'
}

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [[remarkGfm, remarkGFMOptions], remarkFrontmatter, remarkMdxFrontmatter], // Remark plugins
    rehypePlugins: [[rehypePrettyCode, rehypePrettyPrintOptions]], // Rehype plugins
  },
})

export default withMDX(nextConfig);
