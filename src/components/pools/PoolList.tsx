import React, { useState } from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pool } from '../../types/pool';
import { usePoolMetrics } from '../../hooks/usePoolMetrics';

interface PoolItemProps {
  pool: Pool;
}

function PoolItem({ pool }: PoolItemProps) {
  const { volume24h, fees24h, feeToTVL, loading, refetch } = usePoolMetrics(pool.id);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Link
      to={`/pool/${pool.id}`}
      className="block bg-surface group relative overflow-hidden
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
      <div className="flex items-center h-16 px-6">
        {/* Token Pair Column */}
        <div className="w-[300px] flex items-center">
          <div className="w-8 h-8 bg-gradient-radial from-primary-400/10 to-primary-600/10 
                      rounded-full flex items-center justify-center mr-3 
                      group-hover:from-primary-400/20 group-hover:to-primary-600/20 
                      transition-all duration-300">
            {pool.iconUrl ? (
              <img src={pool.iconUrl} alt={pool.name} className="w-6 h-6 rounded-full" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-400 to-primary-500" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
              {pool.name}
            </h3>
            <span className="text-xs font-medium text-primary-300 bg-primary-500/10 px-1.5 py-0.5 rounded
                         group-hover:bg-primary-500/20 transition-all duration-300">
              {pool.fee}
            </span>
          </div>
        </div>

        {/* Metrics Columns */}
        <div className="flex-1 grid grid-cols-4">
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
              {pool.tvl}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                {loading ? '-' : volume24h}
              </p>
              <button
                onClick={handleRefresh}
                className="p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <RefreshCw 
                  className={`w-3 h-3 text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} 
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
              {loading ? '-' : fees24h}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium text-accent-blue-400 group-hover:text-accent-blue-300 transition-colors duration-300">
              {loading ? '-' : feeToTVL}
            </p>
          </div>
        </div>
        
        {/* Chevron */}
        <div className="w-8 flex justify-end ml-4">
          <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-primary-400 transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}

interface PoolListProps {
  pools: Pool[];
}

export function PoolList({ pools }: PoolListProps) {
  return (
    <div className="space-y-[2px]">
      {pools.map((pool) => (
        <PoolItem key={pool.id} pool={pool} />
      ))}
    </div>
  );
}