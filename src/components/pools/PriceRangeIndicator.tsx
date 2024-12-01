import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { PriceToggle } from './PriceToggle';

interface PriceRangeIndicatorProps {
  min: string;
  max: string;
  current: string;
  token0: string;
  token1: string;
  isInRange: boolean;
}

export function PriceRangeIndicator({ 
  min, 
  max, 
  current, 
  token0, 
  token1, 
  isInRange 
}: PriceRangeIndicatorProps) {
  const [position, setPosition] = useState(50);
  const [showToken0Price, setShowToken0Price] = useState(true);

  // Convert prices to numbers for calculation
  const minPrice = parseFloat(min);
  const maxPrice = parseFloat(max);
  const currentPrice = parseFloat(current);

  // Determine if we should automatically flip the price display
  useEffect(() => {
    const shouldFlipPrice = currentPrice < 1;
    setShowToken0Price(!shouldFlipPrice);
  }, [currentPrice]);

  // Calculate inverse prices for token1 denomination
  const getInversePrice = (price: number) => 1 / price;

  const formatPrice = (price: number) => {
    const value = showToken0Price ? price : getInversePrice(price);
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'K';
    } else if (value >= 1) {
      return value.toFixed(4);
    } else if (value >= 0.0001) {
      return value.toFixed(6);
    } else {
      return value.toExponential(4);
    }
  };

  // Calculate position percentage
  useEffect(() => {
    const range = maxPrice - minPrice;
    const relativePosition = ((currentPrice - minPrice) / range) * 100;
    // Clamp between 0 and 100
    setPosition(Math.min(Math.max(relativePosition, 0), 100));
  }, [minPrice, maxPrice, currentPrice]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">Price Range</span>
        <PriceToggle
          isToken0={showToken0Price}
          onToggle={() => setShowToken0Price(!showToken0Price)}
          token0Symbol={token0}
          token1Symbol={token1}
        />
      </div>

      {/* Price Range Bar */}
      <div className="relative h-2 bg-surface-hover rounded-full overflow-hidden">
        {/* Active Range Indicator */}
        <div
          className={cn(
            "absolute inset-y-0 rounded-full",
            isInRange ? "bg-primary-400/20" : "bg-accent-pink-400/20"
          )}
          style={{ left: '0%', right: '0%' }}
        />
        
        {/* Current Price Indicator */}
        <AnimatePresence>
          <motion.div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-1 h-4 rounded-full",
              isInRange ? "bg-primary-400" : "bg-accent-pink-400"
            )}
            animate={{ 
              left: `${position}%`,
              transition: { type: "spring", stiffness: 100, damping: 15 }
            }}
            initial={false}
          />
        </AnimatePresence>
      </div>

      {/* Price Labels */}
      <div className="flex justify-between text-[10px]">
        <div className="space-y-1">
          <div className="text-gray-500">Min Price</div>
          <div className="text-gray-300">
            {formatPrice(minPrice)} {showToken0Price ? token1 : token0} per {showToken0Price ? token0 : token1}
          </div>
        </div>
        <div className="space-y-1 text-center">
          <div className="text-gray-500">Current Price</div>
          <div className={cn(
            "font-medium",
            isInRange ? "text-primary-400" : "text-accent-pink-400"
          )}>
            {formatPrice(currentPrice)} {showToken0Price ? token1 : token0} per {showToken0Price ? token0 : token1}
          </div>
        </div>
        <div className="space-y-1 text-right">
          <div className="text-gray-500">Max Price</div>
          <div className="text-gray-300">
            {formatPrice(maxPrice)} {showToken0Price ? token1 : token0} per {showToken0Price ? token0 : token1}
          </div>
        </div>
      </div>
    </div>
  );
}