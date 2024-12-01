import { useQuery } from '@apollo/client';
import { GET_POOLS } from '../graphql/queries';
import { formatUSDValue, calculateFeeToTVL } from '../lib/utils';

export function usePoolsData(page: number, itemsPerPage: number) {
  const { data, loading, error } = useQuery(GET_POOLS, {
    variables: {
      first: 30, // Fetch all 30 pools at once
      skip: 0,   // No skip as we'll handle pagination in memory
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  const allPools = data?.pools.map((pool: any) => ({
    id: pool.id,
    name: `${pool.token0.symbol}-${pool.token1.symbol}`,
    fee: `${(pool.feeTier / 10000).toFixed(2)}%`,
    tvl: formatUSDValue(pool.totalValueLockedUSD),
    volume24h: formatUSDValue(pool.volumeUSD),
    fees24h: formatUSDValue(pool.feesUSD),
    feeToTVL: calculateFeeToTVL(pool.feesUSD, pool.totalValueLockedUSD),
  })) || [];

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPools = allPools.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allPools.length / itemsPerPage);

  return {
    pools: paginatedPools,
    totalPools: allPools.length,
    totalPages,
    loading,
    error,
  };
}