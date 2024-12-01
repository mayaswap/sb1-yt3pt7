import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PriceTickerProps {
  basePrice: number;
  token1: string;
  token2: string;
}

export function PriceTicker({ basePrice, token1, token2 }: PriceTickerProps) {
  const [price, setPrice] = useState(basePrice);
  const [trend, setTrend] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.001 * basePrice;
      const newPrice = price + change;
      setPrice(newPrice);
      setTrend(change > 0 ? 'up' : 'down');
    }, 2000);

    return () => clearInterval(interval);
  }, [price, basePrice]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-1.5">
          <span className="text-sm font-medium text-white">
            {price.toFixed(6)}
          </span>
          <span className="text-xs text-gray-400">
            {token1} per {token2}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {trend && (
            <>
              {trend === 'up' ? (
                <ArrowUp className="w-3 h-3 text-success-400" />
              ) : (
                <ArrowDown className="w-3 h-3 text-accent-pink-400" />
              )}
              <span 
                className={`text-xs ${
                  trend === 'up' ? 'text-success-400' : 'text-accent-pink-400'
                }`}
              >
                {((Math.abs(price - basePrice) / basePrice) * 100).toFixed(3)}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}