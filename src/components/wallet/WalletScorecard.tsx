import React from 'react';
import { RefreshCw, Wallet, Clock, Layers } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WalletScorecardProps {
  isConnected: boolean;
  onConnect: () => void;
  token0?: string;
  token1?: string;
}

export function WalletScorecard({ isConnected, onConnect, token0, token1 }: WalletScorecardProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Wallet className="w-4 h-4 text-gray-400" />
        <h2 className="text-base font-medium text-white">Your Position</h2>
      </div>

      {/* Main Card */}
      <div className="bg-surface rounded-xl border border-border">
        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-4 px-4 py-2.5 border-b border-border">
          <div>
            <div className="text-[10px] text-gray-500">TOTAL BALANCE</div>
            <div className="space-y-1.5 mt-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-hover text-gray-500">USD Value</span>
                <span className="text-xs font-medium text-white">-</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-gray-500">{token0 || '-'}</span>
                <span className="text-xs font-medium text-white">-</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-gray-500">{token1 || '-'}</span>
                <span className="text-xs font-medium text-white">-</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">TOTAL ASSETS</div>
            <div className="space-y-1.5 mt-0.5">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded bg-primary-400" />
                <span className="text-sm font-semibold text-white">-</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded bg-accent-pink-400" />
                <span className="text-sm font-semibold text-white">-</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">TOTAL FEES</div>
            <div className="text-sm font-semibold text-white mt-0.5">Data unavailable</div>
          </div>
        </div>

        {/* Unclaimed Fees */}
        <div className="px-4 py-2.5 border-b border-border">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-500">TOTAL UNCLAIMED FEES</span>
            <span className="text-xs font-medium text-white">-</span>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="px-4 py-2.5 border-b border-border">
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

        {/* Empty State */}
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