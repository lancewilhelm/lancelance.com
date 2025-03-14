import fs from 'fs'
import path from 'path'

// type Metadata = {
//   title: string
//   date: string
//   description: string
//   tags: string[]
//   categories: string[]
// }

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

// function readMDXFile(filePath: string) {
//   let rawContent = fs.readFileSync(filePath, 'utf-8')
//   return parseFrontmatter(rawContent)
// }

export async function getBlogPosts(metadataOnly: boolean = false) {
  const mdxFiles = getMDXFiles('content/blog/')
  return await Promise.all(
    mdxFiles.map(async (file) => {
      if (metadataOnly) {
        const mdxModule = await import(`@/content/blog/${file}`)
        return { metadata: mdxModule.metadata, slug: file.replace('.mdx', '') }
      } else {
        return null
      }
    })
  )
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate}(${formattedDate})`
}
