import React from 'react';
import { Percent } from 'lucide-react';

export function FeeTiers() {
  const tiers = [
    { fee: '0.01%', tvl: '$0.00', volume: '$0.00' },
    { fee: '0.05%', tvl: '$0.00', volume: '$0.00' },
    { fee: '0.3%', tvl: '$0.00', volume: '$0.00' },
    { fee: '1%', tvl: '$0.00', volume: '$0.00' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Fee Tiers</h3>
        <Percent className="h-5 w-5 text-purple-600" />
      </div>
      <div className="grid gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.fee}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-900">{tier.fee}</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-500">TVL</p>
                <p className="font-medium text-gray-900">{tier.tvl}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">24h Volume</p>
                <p className="font-medium text-gray-900">{tier.volume}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}