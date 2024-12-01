import React from 'react';
import { useWallet } from '../../hooks/useWallet';

export function PositionsTable() {
  const { account, connectWallet } = useWallet();

  const columns = [
    'PRICE RANGE',
    'VS. CURRENT PRICE',
    'BALANCE',
    'UNCLAIMED FEE/TVL',
    'UNCLAIMED FEES',
    'ALL-TIME FEES',
    'AUTOMATIONS'
  ];

  return (
    <div className="bg-surface rounded-xl border border-border">
      <div className="px-6 py-4 border-b border-border">
        <div className="grid grid-cols-7 gap-4">
          {columns.map((column, index) => (
            <div 
              key={column}
              className={`text-xs font-medium text-gray-400 ${
                index === 2 ? 'flex items-center space-x-2' : ''
              }`}
            >
              {column}
              {index === 2 && (
                <svg className="w-4 h-4 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 7h10M7 12h10M7 17h10" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-12 flex flex-col items-center justify-center text-center">
        {account ? (
          <div className="text-gray-400">No positions found</div>
        ) : (
          <>
            <button
              onClick={connectWallet}
              className="text-white hover:underline mb-2"
            >
              Connect wallet
            </button>
            <p className="text-gray-500">to see your positions or create one.</p>
          </>
        )}
      </div>
    </div>
  );
}