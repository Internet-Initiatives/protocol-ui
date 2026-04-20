'use client'

import { Button } from '@/components/Button'

export function DownloadButton({ content, filename }: { content: string; filename: string }) {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Button href="#" onClick={handleDownload}>
      <>Download as Markdown</>
    </Button>
  )
}
