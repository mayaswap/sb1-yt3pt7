import { useQuery } from '@apollo/client';
import { GET_POOL } from '../graphql/queries';
import { formatUSDValue, calculateFeeToTVL } from '../lib/utils';

export function usePoolData(id: string) {
  const { data, loading, error } = useQuery(GET_POOL, {
    variables: { id },
  });

  const pool = data?.pool ? {
    id: data.pool.id,
    name: `${data.pool.token0.symbol}-${data.pool.token1.symbol}`,
    fee: `${(data.pool.feeTier / 10000).toFixed(2)}%`,
    tvl: formatUSDValue(data.pool.totalValueLockedUSD),
    volume24h: formatUSDValue(data.pool.volumeUSD),
    fees24h: formatUSDValue(data.pool.feesUSD),
    feeToTVL: calculateFeeToTVL(data.pool.feesUSD, data.pool.totalValueLockedUSD),
    token0Price: data.pool.token0Price,
    token1Price: data.pool.token1Price,
    token0Address: data.pool.token0.id,
    token1Address: data.pool.token1.id,
  } : null;

  return {
    pool,
    loading,
    error,
  };
}