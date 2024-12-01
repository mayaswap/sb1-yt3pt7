import React from 'react';
import { BarChart3 } from 'lucide-react';

export function VolumeMetrics() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Volume Metrics</h3>
        <BarChart3 className="h-5 w-5 text-purple-600" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">24h Volume</p>
          <p className="text-2xl font-bold text-gray-900">$0.00</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">7d Volume</p>
          <p className="text-2xl font-bold text-gray-900">$0.00</p>
        </div>
      </div>
    </div>
  );
}