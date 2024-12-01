import React from 'react';
import { RefreshCw, Wallet, Clock, Layers } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTokenValues } from '../../hooks/useTokenValues';

interface YourPositionProps {
  isConnected: boolean;
  onConnect: () => void;
  token0?: {
    symbol: string;
    amount: string;
    decimals: number;
    address: string;
  };
  token1?: {
    symbol: string;
    amount: string;
    decimals: number;
    address: string;
  };
}

export function YourPosition({ 
  isConnected, 
  onConnect, 
  token0,
  token1 
}: YourPositionProps) {
  const tokenValues = useTokenValues({
    token0Amount: token0?.amount || '0',
    token0Decimals: token0?.decimals || 18,
    token0Address: token0?.address || '',
    token1Amount: token1?.amount || '0',
    token1Decimals: token1?.decimals || 18,
    token1Address: token1?.address || ''
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Wallet className="w-4 h-4 text-gray-400" />
        <h2 className="text-lg font-semibold text-white">Your Position</h2>
      </div>

      {/* Main Card */}
      <div className="bg-surface rounded-xl border border-border">
        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-border">
          <div>
            <div className="text-sm font-medium text-white mb-2">TOTAL BALANCE</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">USD Value</span>
                <span className="text-xs font-medium text-white">
                  {tokenValues.loading ? 'Loading...' : tokenValues.totalValue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">{token0?.symbol || '-'}</span>
                <span className="text-xs font-medium text-white">
                  {tokenValues.loading ? 'Loading...' : tokenValues.token0Value}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">{token1?.symbol || '-'}</span>
                <span className="text-xs font-medium text-white">
                  {tokenValues.loading ? 'Loading...' : tokenValues.token1Value}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-white mb-2">TOTAL ASSETS</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-2 h-2 rounded bg-primary-400" />
                <span className="text-xs font-medium text-white">
                  {token0?.amount || '-'} {token0?.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-2 h-2 rounded bg-accent-pink-400" />
                <span className="text-xs font-medium text-white">
                  {token1?.amount || '-'} {token1?.symbol}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-white mb-2">TOTAL FEES</div>
            <div className="text-xs font-medium text-white">Data unavailable</div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">TOTAL UNCLAIMED FEES</span>
            <span className="text-xs font-medium text-white">-</span>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-white">
                <Layers className="w-3.5 h-3.5" />
                <span className="text-xs">Positions</span>
                <span className="text-[10px] bg-surface-hover px-1.5 py-0.5 rounded">0</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">Activity</span>
              </button>
            </div>
            <button className="flex items-center space-x-1 text-[10px] text-gray-500 hover:text-gray-400">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REFRESH</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="border border-dashed border-border rounded-lg p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-sm text-gray-400 mb-2">+ CREATE POSITION</div>
              {isConnected ? (
                <p className="text-xs text-gray-500">No positions found</p>
              ) : (
                <button
                  onClick={onConnect}
                  className="text-xs text-white hover:underline"
                >
                  Connect wallet
                </button>
              )}
              <p className="text-xs text-gray-500">to see your positions or create one.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}