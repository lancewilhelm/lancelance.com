export interface BlogPost {
  title: string
  description: string
  date: string
  tags: string[]
  categories: string[]
  slug: string
  path: string
  content: string
}

export type BlogPostPreview = Omit<BlogPost, 'content'>
