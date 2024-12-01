import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PriceToggleProps {
  isToken0: boolean;
  onToggle: () => void;
  token0Symbol: string;
  token1Symbol: string;
}

export function PriceToggle({ isToken0, onToggle, token0Symbol, token1Symbol }: PriceToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 px-2 py-1 rounded-lg 
                 bg-surface-hover hover:bg-white/5 transition-colors"
    >
      <ArrowRightLeft className="w-4 h-4 text-primary-400" />
      <span className="text-xs text-gray-400">
        Price in {isToken0 ? token0Symbol : token1Symbol}
      </span>
    </button>
  );
}