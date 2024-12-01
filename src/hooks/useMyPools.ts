import { useWalletPositions } from './useWalletPositions';
import { PoolPosition } from '../types/pool';

export function useMyPools(account: string | null) {
  const { positions: walletPositions, loading } = useWalletPositions(account);

  // Transform wallet positions into PoolPosition format
  const positions: PoolPosition[] = walletPositions.map((pos: any) => ({
    id: pos.id,
    poolName: pos.poolName,
    fee: pos.fee,
    totalValue: pos.tvl || '$0.00',
    token0: {
      symbol: pos.token0.symbol,
      amount: pos.token0.deposited,
      value: pos.token0.value || '$0.00',
      price: pos.token0.price,
      decimals: pos.token0.decimals,
      address: pos.token0.address
    },
    token1: {
      symbol: pos.token1.symbol,
      amount: pos.token1.deposited,
      value: pos.token1.value || '$0.00',
      price: pos.token1.price,
      decimals: pos.token1.decimals,
      address: pos.token1.address
    },
    apr: '0%', // To be implemented
    impermanentLoss: '0%', // To be implemented
    tickRange: {
      lower: pos.range.min.toString(),
      upper: pos.range.max.toString(),
      current: pos.range.current.toString(),
    },
    range: {
      min: pos.range.min.toString(),
      max: pos.range.max.toString(),
      current: pos.range.current.toString(),
      status: pos.range.status
    },
    activity: {
      deposits: [
        {
          symbol: pos.token0.symbol,
          amount: pos.token0.deposited,
          value: pos.token0.value || '$0.00',
          timestamp: 'Recently',
        },
        {
          symbol: pos.token1.symbol,
          amount: pos.token1.deposited,
          value: pos.token1.value || '$0.00',
          timestamp: 'Recently',
        },
      ],
      withdrawals: [
        {
          symbol: pos.token0.symbol,
          amount: pos.token0.withdrawn,
          value: pos.token0.withdrawn,
          timestamp: 'Recently',
        },
        {
          symbol: pos.token1.symbol,
          amount: pos.token1.withdrawn,
          value: pos.token1.withdrawn,
          timestamp: 'Recently',
        },
      ].filter(w => parseFloat(w.amount) > 0),
    },
  }));

  return { positions, loading };
}