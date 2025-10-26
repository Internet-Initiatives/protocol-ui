'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface ColorSwatchProps {
  name: string
  hex: string
  description?: string
  textColor?: 'light' | 'dark'
  contrastRatio?: string
  className?: string
}

export function ColorSwatch({
  name,
  hex,
  description,
  textColor = 'dark',
  contrastRatio,
  className,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Check if color is white or very light (needs border)
  const isLightColor = () => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.95 // Very light colors get border
  }

  return (
    <button
      onClick={copyToClipboard}
      className={clsx(
        'group relative overflow-hidden rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white',
        isLightColor() && 'border border-zinc-200 dark:border-zinc-700',
        className,
      )}
      style={{ backgroundColor: hex }}
      aria-label={`Copy ${name} color code ${hex}`}
    >
      <div className="p-4">
        <div
          className={clsx(
            'flex flex-col gap-1',
            textColor === 'light' ? 'text-white' : 'text-zinc-900',
          )}
        >
          <span className="text-sm font-semibold">{name}</span>
          <span className="font-mono text-xs opacity-90">{hex}</span>
          {contrastRatio && (
            <span className="text-xs opacity-75">Contrast: {contrastRatio}</span>
          )}
          {description && (
            <span className="mt-1 text-xs opacity-75">{description}</span>
          )}
        </div>
      </div>

      {/* Copy feedback */}
      <div
        className={clsx(
          'absolute inset-0 flex items-center justify-center bg-zinc-900/90 transition-opacity duration-200',
          copied ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex items-center gap-2 text-white">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-medium">Copied!</span>
        </div>
      </div>

      {/* Hover indicator */}
      <div
        className={clsx(
          'absolute bottom-0 right-0 p-2 opacity-0 transition-opacity group-hover:opacity-100',
          textColor === 'light' ? 'text-white' : 'text-zinc-900',
        )}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
    </button>
  )
}

interface ColorScaleProps {
  colors: Array<{
    name: string
    hex: string
    description?: string
    contrastRatio?: string
  }>
  columns?: number
}

export function ColorScale({ colors, columns = 5 }: ColorScaleProps) {
  // Determine text color based on luminance
  const getTextColor = (hex: string): 'light' | 'dark' => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? 'dark' : 'light'
  }

  // Responsive grid classes based on columns
  const getGridClass = () => {
    if (columns <= 2) return 'grid-cols-1 sm:grid-cols-2'
    if (columns === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    if (columns === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
  }

  return (
    <div className={`grid gap-3 ${getGridClass()}`}>
      {colors.map((color) => (
        <ColorSwatch
          key={color.hex}
          name={color.name}
          hex={color.hex}
          description={color.description}
          contrastRatio={color.contrastRatio}
          textColor={getTextColor(color.hex)}
          className="min-h-[120px]"
        />
      ))}
    </div>
  )
}
