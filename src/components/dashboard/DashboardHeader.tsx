import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function DashboardHeader() {
  const tabs = [
    { id: 'open', label: 'OPEN POSITIONS', active: true },
    { id: 'closed', label: 'CLOSED POSITIONS', active: false },
    { id: 'pools', label: 'POOLS', active: false },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-gray-400" />
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={cn(
              "px-4 py-2 text-xs font-medium rounded-lg transition-colors",
              tab.active 
                ? "bg-surface text-white" 
                : "text-gray-400 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}