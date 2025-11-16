"use client"

import { useState } from 'react'

interface FloatingChatButtonProps {
  onClick?: () => void
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showNotification, setShowNotification] = useState(true)

  const handleClick = () => {
    setShowNotification(false)
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Open chat"
    >
      <div className="relative">
        <div className={`w-20 h-20 rounded-full overflow-hidden shadow-2xl shadow-blue-500/40 border-4 border-white transition-all duration-300 ${
          isHovered ? 'scale-110 shadow-blue-500/60' : 'scale-100'
        }`}>
          <img
            src="/images/design-mode/floatingbutton(2).png"
            alt="Chat Assistant"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
        
        {showNotification && (
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white animate-bounce">
            1
          </div>
        )}
      </div>
    </button>
  )
}
