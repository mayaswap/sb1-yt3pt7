import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { formatUSDValue, calculateFeeToTVL } from '../lib/utils';

const GET_POOL_METRICS = gql`
  query GetPoolMetrics($poolId: String!, $startDate: Int!, $endDate: Int!) {
    poolDayDatas(
      first: 1
      orderBy: date
      orderDirection: desc
      where: {
        pool: $poolId
        date_gte: $startDate
        date_lt: $endDate
      }
    ) {
      date
      volumeUSD
      feesUSD
      tvlUSD
    }
  }
`;

export function usePoolMetrics(poolId: string) {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const startDate = Math.floor(oneDayAgo.getTime() / 1000);
  const endDate = Math.floor(now.getTime() / 1000);

  const { data, loading, refetch } = useQuery(GET_POOL_METRICS, {
    variables: {
      poolId,
      startDate,
      endDate,
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
    skip: !poolId,
  });

  const poolData = data?.poolDayDatas[0] || { volumeUSD: '0', feesUSD: '0', tvlUSD: '0' };

  return {
    volume24h: formatUSDValue(poolData.volumeUSD),
    fees24h: formatUSDValue(poolData.feesUSD),
    feeToTVL: calculateFeeToTVL(poolData.feesUSD, poolData.tvlUSD),
    loading,
    refetch,
  };
}