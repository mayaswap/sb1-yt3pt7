import { useQuery } from '@apollo/client';
import { GET_PROTOCOL_METRICS } from '../graphql/queries';
import { formatUSDValue } from '../lib/utils';

export function useProtocolMetrics() {
  const { data, loading, refetch } = useQuery(GET_PROTOCOL_METRICS, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  const metrics = data?.factories?.[0] ? {
    totalVolume: formatUSDValue(data.factories[0].totalVolumeUSD),
    totalFees: formatUSDValue(data.factories[0].totalFeesUSD),
    tvl: formatUSDValue(data.factories[0].totalValueLockedUSD),
  } : {
    totalVolume: '$0',
    totalFees: '$0',
    tvl: '$0',
  };

  return { metrics, loading, refetch };
}