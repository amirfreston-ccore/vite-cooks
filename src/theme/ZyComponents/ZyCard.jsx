import { GlowingEffect } from '@/components/ui/glowing-effect'
import React from 'react'

function ZyCard({ children, className }) {
  return (
    <div className={`relative rounded-3xl ${className}`}>
      <GlowingEffect
        blur={0}
        borderWidth={1}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01} />
      {children}
    </div>
  )
}

export default ZyCard