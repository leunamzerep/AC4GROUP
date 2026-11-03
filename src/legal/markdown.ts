// Lector de Markdown mínimo para los textos legales (src/content/legal/**).
// Soporta solo lo que usan esos textos: "## títulos", párrafos, listas con "- " (un nivel
// de sublista con 2 espacios), [enlaces](url), URLs sueltas y **negritas**.
// Comentarios <!-- --> se ignoran, salvo la línea "META: updated=... | note=...".

export type ListItem = { text: string; children: string[] }
export type Block = { type: 'p'; text: string } | { type: 'ul'; items: ListItem[] }
export type Section = { id: string; title: string; blocks: Block[] }
export type LegalDoc = { updated: string; note?: string; sections: Section[] }

export function parseLegal(md: string): LegalDoc {
  const metaMatch = md.match(/<!--\s*META:\s*(.*?)\s*-->/)
  const meta = Object.fromEntries(
    (metaMatch?.[1] ?? '')
      .split('|')
      .map((pair) => pair.split('=').map((s) => s.trim()))
      .filter((kv) => kv.length === 2),
  )
  const body = md.replace(/<!--[\s\S]*?-->/g, '')

  const sections: Section[] = []
  let current: Section | null = null
  let paragraph: string[] = []
  let list: ListItem[] | null = null

  const flush = () => {
    if (!current) return
    if (paragraph.length) current.blocks.push({ type: 'p', text: paragraph.join(' ') })
    if (list) current.blocks.push({ type: 'ul', items: list })
    paragraph = []
    list = null
  }

  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trimEnd()
    if (line.startsWith('# ')) continue // el H1 lo pone la página
    if (line.startsWith('## ')) {
      flush()
      const title = line.slice(3).trim()
      const num = title.match(/^(\d+)\./)?.[1] ?? String(sections.length + 1)
      current = { id: `s${num}`, title, blocks: [] }
      sections.push(current)
      continue
    }
    if (!current) continue
    const sub = line.match(/^ {2,}- (.*)$/)
    const item = line.match(/^- (.*)$/)
    if (item) {
      if (paragraph.length) flush()
      list ??= []
      list.push({ text: item[1], children: [] })
    } else if (sub && list?.length) {
      list[list.length - 1].children.push(sub[1])
    } else if (line.trim() === '') {
      flush()
    } else {
      if (list) flush()
      paragraph.push(line.trim())
    }
  }
  flush()

  return { updated: meta.updated ?? '', note: meta.note, sections }
}

export type Inline = { kind: 'text' | 'strong'; value: string } | { kind: 'link'; value: string; href: string }

/** Divide un texto en trozos: texto, **negrita**, [enlace](url) y URLs sueltas. */
export function parseInline(text: string): Inline[] {
  const out: Inline[] = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s)]+[^\s).,;:])/g
  let last = 0
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ kind: 'text', value: text.slice(last, m.index) })
    if (m[1]) out.push({ kind: 'strong', value: m[1] })
    else if (m[2]) out.push({ kind: 'link', value: m[2], href: m[3] })
    else out.push({ kind: 'link', value: m[4], href: m[4] })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ kind: 'text', value: text.slice(last) })
  return out
}
