import { useEffect } from 'react'

function setMetaDescription(description: string) {
  let tag = document.querySelector('meta[name="description"]')
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag) }
  tag.setAttribute('content', description)
}
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    setMetaDescription(description)
  }, [title, description])
}
