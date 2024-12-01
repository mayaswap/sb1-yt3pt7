import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  // Calculate nonagon points
  const points = Array.from({ length: 9 }, (_, i) => {
    const angle = (i * 360) / 9 - 90; // Start from top
    const radian = (angle * Math.PI) / 180;
    const radius = 14; // Adjust size of nonagon
    const x = 20 + radius * Math.cos(radian);
    const y = 20 + radius * Math.sin(radian);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative w-10 h-10">
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow filter */}
          <defs>
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.062745098
                        0 0 0 0 0.72549019
                        0 0 0 0 0.6
                        0 0 0 1 0"
              />
              <feBlend in="SourceGraphic" in2="glow" mode="normal" />
            </filter>
          </defs>

          {/* Nonagon shape */}
          <polygon
            points={points}
            className="fill-none stroke-[1.5]"
            style={{
              stroke: '#10b981',
              filter: 'url(#neon-glow)',
            }}
          />

          {/* Inner "9" */}
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-white text-[16px] font-bold"
            style={{ filter: 'url(#neon-glow)' }}
          >
            9
          </text>
        </svg>
      </div>
      <span className="text-xl font-bold text-white">
        9MM
      </span>
    </div>
  );
}