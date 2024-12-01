import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { formatUSDValue } from '../lib/utils';

const GET_POOL_DETAILS = gql`
  query GetPoolDetails($id: ID!) {
    pool(id: $id) {
      token0 {
        symbol
        decimals
      }
      token1 {
        symbol
        decimals
      }
      totalValueLockedToken0
      totalValueLockedToken1
      totalValueLockedUSD
      depositedToken0
      depositedToken1
      withdrawnToken0
      withdrawnToken1
      tickLower
      tickUpper
    }
  }
`;

export function usePoolDetails(poolId: string) {
  const { data, loading, error } = useQuery(GET_POOL_DETAILS, {
    variables: { id: poolId },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
    skip: !poolId,
  });

  const poolDetails = data?.pool ? {
    token0: {
      symbol: data.pool.token0.symbol,
      decimals: data.pool.token0.decimals,
      totalLocked: data.pool.totalValueLockedToken0,
      deposited: data.pool.depositedToken0,
      withdrawn: data.pool.withdrawnToken0,
    },
    token1: {
      symbol: data.pool.token1.symbol,
      decimals: data.pool.token1.decimals,
      totalLocked: data.pool.totalValueLockedToken1,
      deposited: data.pool.depositedToken1,
      withdrawn: data.pool.withdrawnToken1,
    },
    totalValueLockedUSD: formatUSDValue(data.pool.totalValueLockedUSD),
    tickRange: {
      lower: data.pool.tickLower,
      upper: data.pool.tickUpper,
    },
  } : null;

  return {
    poolDetails,
    loading,
    error,
  };
}