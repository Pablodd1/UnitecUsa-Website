"use client"
import React from "react"
import { motion } from "framer-motion"

/**
 * TetrisContainer – a gamified, Tetris‑style representation of container loading.
 * Each cargo item appears as a falling block in a 10‑column grid, filling the container
 * from the bottom up. The visual is lightweight, works on all devices and replaces the
 * previous 3D video/Three.js view.
 */
export default function Container3DView({
  size = "40ft",
  width = 2.35,
  height = 2.39,
  length = 12.03,
  items = [],
  fillPercent = 0,
  isInteractive = false,
  onSelect,
  className = "",
  scale = 1,
}) {
  // Grid configuration – 10 columns, rows derived from item count
  const COLUMNS = 10
  const rowsNeeded = Math.ceil(items.length / COLUMNS) + 2 // extra space for falling animation

  // Compute block positions (row from bottom, column from left)
  const blocks = items.map((item, idx) => {
    const col = (idx % COLUMNS) + 1 // CSS grid column start (1‑based)
    const rowFromBottom = Math.floor(idx / COLUMNS) + 1
    const row = rowsNeeded - rowFromBottom + 1 // CSS grid row start (top = 1)
    return { id: item.id || idx, col, row, color: item.color || "#60A5FA" }
  })

  // Handler for interactive click (optional)
  const handleClick = () => {
    if (isInteractive && onSelect) onSelect()
  }

  return (
    <div
      className={`relative ${className} group`}
      style={{
        width: "100%",
        maxWidth: `${length * 40}px`,
        aspectRatio: `${length}/${height}`,
        cursor: isInteractive ? "pointer" : "default",
        perspective: "800px",
        transform: `scale(${scale})`,
      }}
      onClick={handleClick}
    >
      {/* Grid background */}
      <div
        className="grid gap-0.5 bg-gray-900/30 p-1 rounded-xl"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gridAutoRows: "1fr",
          height: "100%",
        }}
      >
        {/* Render each block with a falling animation */}
        {blocks.map(block => (
          <motion.div
            key={block.id}
            className="rounded-sm"
            style={{
              backgroundColor: block.color,
              gridColumnStart: block.col,
              gridRowStart: block.row,
            }}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: block.row * 0.05,
              type: "spring",
              stiffness: 120,
              damping: 14,
            }}
          />
        ))}
        {/* Empty cells to keep grid size consistent */}
        {Array.from({ length: rowsNeeded * COLUMNS - blocks.length }).map((_, i) => (
          <div key={`empty-${i}`} className="opacity-0" />
        ))}
      </div>
    </div>
  )
}
