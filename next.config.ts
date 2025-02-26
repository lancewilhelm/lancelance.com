import createMDX from '@next/mdx'

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // plugins go here
})

export default withMDX(nextConfig);
