import { ShikiTransformer } from 'shiki'

function parseMetaString(str = '') {
  return Object.fromEntries(
    str.split(' ').reduce((acc: [string, string | true][], cur) => {
      const matched = cur.match(/(.+)?=("(.+)"|'(.+)')$/)
      if (matched === null) return acc
      const key = matched[1]
      const value = matched[3] || matched[4] || true
      acc = [...acc, [key, value]]
      return acc
    }, [])
  )
}

export function processMeta(): ShikiTransformer {
  return {
    name: 'shiki-transformer-process-meta',
    preprocess() {
      if (!this.options.meta) return
      Object.assign(this.options.meta, { language: this.options.lang || 'text' })
      const rawMeta = this.options.meta?.__raw
      if (!rawMeta) return
      const meta = parseMetaString(rawMeta)
      Object.assign(this.options.meta, meta)
    }
  }
}
