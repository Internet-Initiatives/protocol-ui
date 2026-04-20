'use client'

import { Button } from '@/components/Button'

export function DownloadTokensButton({ content, filename }: { content: string; filename: string }) {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    const blob = new Blob([content], { type: 'text/css' })
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
      <>Download as CSS</>
    </Button>
  )
}
