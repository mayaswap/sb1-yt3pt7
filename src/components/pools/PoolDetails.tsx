import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Copy, Droplets, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pool } from '../../types/pool';
import { PriceTicker } from './PriceTicker';
import { usePoolMetrics } from '../../hooks/usePoolMetrics';

interface PoolDetailsProps {
  pool: Pool;
}

export function PoolDetails({ pool }: PoolDetailsProps) {
  const { volume24h, fees24h, loading, refetch } = usePoolMetrics(pool.id);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [token1, token2] = pool.name.split('-');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="w-[420px] bg-background">
      {/* Pool Title Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-3">
          <Link 
            to="/"
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </Link>
          
          <div className="flex items-center space-x-2">
            <img src="/path-to-icon1" alt="" className="w-5 h-5" />
            <img src="/path-to-icon2" alt="" className="w-5 h-5" />
            <h1 className="text-xl font-bold text-white">{pool.name}</h1>
            <span className="text-xs font-medium text-white bg-white/10 px-2 py-0.5 rounded">
              {pool.fee}
            </span>
          </div>
        </div>
        
        <PriceTicker 
          basePrice={0.0459} 
          token1={token1}
          token2={token2}
        />
      </div>

      {/* Main Card */}
      <div className="bg-surface rounded-xl border border-border mt-4">
        {/* Pool Information Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-gray-400" />
            <span className="text-base font-medium text-white">Pool Information</span>
          </div>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            disabled={isRefreshing}
          >
            <RefreshCw 
              className={`w-4 h-4 text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-4 gap-6 px-6 py-5 border-b border-border">
          <div>
            <div className="text-[10px] text-gray-500">TVL</div>
            <div className="text-sm font-semibold text-white mt-1.5">{pool.tvl}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">24H VOLUME</div>
            <div className="text-sm font-semibold text-white mt-1.5">
              {loading ? '-' : volume24h}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">24H FEES</div>
            <div className="text-sm font-semibold text-white mt-1.5">
              {loading ? '-' : fees24h}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">24H FEE/TVL</div>
            <div className="text-sm font-semibold text-accent-blue-400 mt-1.5">{pool.feeToTVL}</div>
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
        {/* ... */}
      </div>
    </div>
  );
}