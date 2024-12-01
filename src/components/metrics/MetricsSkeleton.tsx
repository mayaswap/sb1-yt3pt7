import React from 'react';
import { RefreshCw } from 'lucide-react';

export function MetricsSkeleton() {
  return (
    <div className="bg-surface rounded-lg border border-border/50 backdrop-blur-sm">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-20 bg-gray-800 rounded animate-pulse" />
          <button
            disabled
            className="rounded-lg bg-gray-800 w-7 h-7 flex items-center justify-center"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="h-2.5 w-10 bg-gray-800 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
          </div>

          <div className="space-y-1.5">
            <div className="h-2.5 w-10 bg-gray-800 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}