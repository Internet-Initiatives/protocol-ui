'use client'

import { useState } from 'react'

interface ColorChipProps {
  hex: string
  label: string
  border?: boolean
}

export function ColorChip({ hex, label, border = false }: ColorChipProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Auto-detect text color based on background luminance
  const getLuminance = (hexColor: string): number => {
    const rgb = parseInt(hexColor.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255
  }

  const luminance = getLuminance(hex)
  const textColor = luminance > 0.5 ? '#171717' : '#FFFFFF'
  const borderColor = luminance > 0.5 ? '#E5E5E5' : '#FFFFFF'

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFCB05] focus:ring-offset-2"
      style={{
        backgroundColor: hex,
        color: textColor,
        border: border ? `1px solid ${borderColor}` : undefined,
      }}
      title={`Click to copy ${hex}`}
    >
      <span
        className="h-3 w-3 rounded-full"
        style={{
          backgroundColor: hex,
          border: `1px solid ${borderColor}`,
        }}
      ></span>
      {copied ? 'Copied!' : label}
    </button>
  )
}
