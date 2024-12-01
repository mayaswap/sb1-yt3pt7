import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PoolPosition } from '../../types/pool';
import { PriceRangeIndicator } from './PriceRangeIndicator';
import { useTokenValues } from '../../hooks/useTokenValues';
import { cn } from '../../lib/utils';

interface PositionCardProps {
  position: PoolPosition;
}

function PositionCard({ position }: PositionCardProps) {
  const tokenValues = useTokenValues({
    token0Amount: position.token0.amount,
    token0Decimals: position.token0.decimals,
    token0Address: position.token0.address,
    token1Amount: position.token1.amount,
    token1Decimals: position.token1.decimals,
    token1Address: position.token1.address
  });

  return (
    <div
      className="bg-surface group relative overflow-hidden
               transition-all duration-300 cursor-pointer
               hover:bg-surface-hover
               before:absolute before:inset-0
               before:opacity-0 before:transition-opacity before:duration-300
               hover:before:opacity-100
               before:pointer-events-none
               before:border before:border-primary-400/30
               before:shadow-[0_0_15px_rgba(52,211,153,0.15)]
               before:rounded-none"
    >
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                {position.poolName}
              </h3>
              <span className="text-xs font-medium text-primary-300 bg-primary-500/10 px-1.5 py-0.5 rounded">
                {position.fee}
              </span>
              <span className="text-xs font-medium text-accent-purple-400">
                #{position.id}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              position.range.status === 'in-range' 
                ? "bg-primary-400/10 text-primary-400" 
                : "bg-accent-pink-400/10 text-accent-pink-400"
            )}>
              {position.range.status === 'in-range' ? 'In Range' : 'Out of Range'}
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors duration-300" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Token Values */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-2">Total Value</div>
              <div className="text-lg font-semibold text-white">
                {tokenValues.loading ? 'Loading...' : tokenValues.totalValue}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">Token Amounts</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-400">{position.token0.symbol}</span>
                  <span className="text-sm text-white">
                    {position.token0.amount} (
                    {tokenValues.loading ? '...' : tokenValues.token0Value})
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-400">{position.token1.symbol}</span>
                  <span className="text-sm text-white">
                    {position.token1.amount} (
                    {tokenValues.loading ? '...' : tokenValues.token1Value})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Activity */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-2">Deposited</div>
              {position.activity.deposits.map((deposit, index) => (
                <div key={index} className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-400">{deposit.symbol}</span>
                  <span className="text-sm text-white">{deposit.amount}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-2">Withdrawn</div>
              {position.activity.withdrawals.map((withdrawal, index) => (
                <div key={index} className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-400">{withdrawal.symbol}</span>
                  <span className="text-sm text-white">{withdrawal.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Price Range */}
          <div>
            <PriceRangeIndicator
              min={position.range.min}
              max={position.range.max}
              current={position.range.current}
              token0={position.token0.symbol}
              token1={position.token1.symbol}
              isInRange={position.range.status === 'in-range'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface PositionListProps {
  positions: PoolPosition[];
}

export function PositionList({ positions }: PositionListProps) {
  return (
    <div className="space-y-[2px]">
      {positions.map((position) => (
        <PositionCard key={position.id} position={position} />
      ))}
    </div>
  );
}