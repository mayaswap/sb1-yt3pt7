import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { VolumeDialog } from './VolumeDialog';
import { useProtocolMetrics } from '../../hooks/useProtocolMetrics';
import { useMonthlyMetrics } from '../../hooks/useMonthlyMetrics';
import { useDailyMetrics } from '../../hooks/useDailyMetrics';
import { useMetricsRefresh } from '../../hooks/useMetricsRefresh';
import { MetricsSkeleton } from './MetricsSkeleton';

interface MetricCardProps {
  title: string;
  volume: string;
  fees: string;
  chartColor: string;
  onRefresh: () => void;
  isLoading: boolean;
}

function MetricCard({ title, volume, fees, chartColor, onRefresh, isLoading }: MetricCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (isLoading) {
    return <MetricsSkeleton />;
  }

  return (
    <>
      <div className="bg-surface rounded-lg border border-border/50 backdrop-blur-sm
                     transition-all duration-300 hover:border-primary-400/30
                     hover:shadow-[0_0_25px_rgba(52,211,153,0.1)]
                     group">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 
                         transition-colors duration-300">
              {title}
            </span>
            <button
              onClick={handleRefresh}
              className="rounded-lg bg-surface-hover hover:bg-white/5
                       transition-all duration-200 w-7 h-7 flex items-center justify-center
                       disabled:opacity-50 disabled:cursor-not-allowed
                       group-hover:bg-primary-400/10"
              disabled={isRefreshing}
            >
              <RefreshCw 
                className={`w-3.5 h-3.5 text-gray-400 group-hover:text-primary-400
                         transition-colors duration-300 ${isRefreshing ? 'animate-spin' : ''}`} 
              />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <div className="text-[10px] font-medium text-gray-500">Volume</div>
              <div className="text-lg font-bold text-white group-hover:text-primary-400/90
                           transition-colors duration-300">
                {volume}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[10px] font-medium text-gray-500">Fees</div>
              <div className="text-lg font-bold text-primary-400 group-hover:text-primary-300
                           transition-colors duration-300">
                {fees}
              </div>
            </div>
          </div>
        </div>
      </div>

      <VolumeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={`${title} - Volume & Fees`}
        data={[]}
        color={chartColor}
      />
    </>
  );
}

export function VolumeMetricsOverview() {
  const { metrics, loading: totalLoading } = useProtocolMetrics();
  const { monthlyVolume, monthlyFees, loading: monthlyLoading } = useMonthlyMetrics();
  const { dailyVolume, dailyFees, loading: dailyLoading } = useDailyMetrics();
  const { refreshMetrics, refreshMonthlyMetrics, refreshDailyMetrics } = useMetricsRefresh();

  return (
    <div className="grid grid-cols-3 gap-3">
      <MetricCard
        title="Total Stats"
        volume={metrics.totalVolume}
        fees={metrics.totalFees}
        chartColor="#10b981"
        onRefresh={refreshMetrics}
        isLoading={totalLoading}
      />
      <MetricCard
        title="Monthly Stats"
        volume={monthlyVolume}
        fees={monthlyFees}
        chartColor="#8b5cf6"
        onRefresh={refreshMonthlyMetrics}
        isLoading={monthlyLoading}
      />
      <MetricCard
        title="Daily Stats"
        volume={dailyVolume}
        fees={dailyFees}
        chartColor="#3b82f6"
        onRefresh={refreshDailyMetrics}
        isLoading={dailyLoading}
      />
    </div>
  );
}