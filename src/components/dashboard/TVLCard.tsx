import React from 'react';
import { DollarSign } from 'lucide-react';

export function TVLCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Total Value Locked</h3>
        <DollarSign className="h-5 w-5 text-purple-600" />
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">$0.00</p>
      <p className="mt-1 text-sm text-gray-500">Across all pools</p>
    </div>
  );
}