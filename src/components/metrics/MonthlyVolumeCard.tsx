import React from 'react';
import { useMonthlyVolume } from '../../hooks/useMonthlyVolume';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function MonthlyVolumeCard() {
  const { monthlyVolume, dailyVolumes, loading, error } = useMonthlyVolume();

  if (loading) {
    return (
      <div className="bg-surface rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface rounded-lg p-6">
        <p className="text-gray-400">Failed to load monthly volume data</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Monthly Volume</h3>
        <span className="text-2xl font-bold text-primary-400">{monthlyVolume}</span>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyVolumes}>
            <XAxis 
              dataKey="date" 
              stroke="#525252"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#262626' }}
            />
            <YAxis 
              stroke="#525252"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#262626' }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              contentStyle={{ 
                background: '#1A1A1A',
                border: '1px solid #262626',
                borderRadius: '8px',
                padding: '12px'
              }}
              labelStyle={{ color: '#a3a3a3' }}
            />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}