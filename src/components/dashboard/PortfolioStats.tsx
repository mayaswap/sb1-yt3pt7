import React from 'react';
import { DollarSign } from 'lucide-react';

export function PortfolioStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatsCard
        title="PORTFOLIO BALANCE"
        value="-"
        showCurrencySelector
      />
      <StatsCard
        title="TOTAL UNCLAIMED FEES"
        value="-"
        showClaimButton
      />
      <StatsCard
        title="TOTAL UNCLAIMED REWARDS"
        value="-"
        showClaimButton
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  showCurrencySelector?: boolean;
  showClaimButton?: boolean;
}

function StatsCard({ title, value, showCurrencySelector, showClaimButton }: StatsCardProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">{title}</span>
        {showClaimButton && (
          <button className="px-3 py-1 text-xs font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-400 transition-colors">
            CLAIM ALL
          </button>
        )}
      </div>
      <div className="mt-2 flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {showCurrencySelector && (
          <button className="flex items-center space-x-1 px-2 py-1 bg-surface-hover rounded text-xs text-gray-400">
            <DollarSign className="w-3 h-3" />
            <span>USD</span>
          </button>
        )}
      </div>
    </div>
  );
}