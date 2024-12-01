import React from 'react';
import { useParams } from 'react-router-dom';
import { PoolDetails } from '../components/pools/PoolDetails';
import { YourPosition } from '../components/wallet/YourPosition';
import { usePoolData } from '../hooks/usePoolData';
import { useWallet } from '../hooks/useWallet';

export function PoolDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { pool, loading, error } = usePoolData(id!);
  const { account, connectWallet } = useWallet();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (error || !pool) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <p className="text-gray-400">Pool not found</p>
      </div>
    );
  }

  const [token0Symbol, token1Symbol] = pool.name.split('-');

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-[420px,1fr] gap-6">
        <PoolDetails pool={pool} />
        <div className="mt-[72px]">
          <YourPosition 
            isConnected={!!account}
            onConnect={connectWallet}
            token0={{
              symbol: token0Symbol,
              amount: '0',
              decimals: 18,
              address: pool.token0Address
            }}
            token1={{
              symbol: token1Symbol,
              amount: '0',
              decimals: 18,
              address: pool.token1Address
            }}
          />
        </div>
      </div>
    </div>
  );
}