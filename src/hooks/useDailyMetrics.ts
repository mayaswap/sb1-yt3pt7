import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { formatUSDValue } from '../lib/utils';

const GET_DAILY_METRICS = gql`
  query GetDailyMetrics($startDate: Int!, $endDate: Int!) {
    pancakeDayDatas(
      first: 1
      orderBy: date
      orderDirection: desc
      where: {
        date_gte: $startDate
        date_lt: $endDate
      }
    ) {
      date
      volumeUSD
      feesUSD
    }
  }
`;

export function useDailyMetrics() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDate = Math.floor(startOfDay.getTime() / 1000);
  const endDate = Math.floor(now.getTime() / 1000);

  const { data, loading, refetch } = useQuery(GET_DAILY_METRICS, {
    variables: {
      startDate,
      endDate,
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  const dailyData = data?.pancakeDayDatas[0] || { volumeUSD: '0', feesUSD: '0' };

  return {
    dailyVolume: formatUSDValue(dailyData.volumeUSD),
    dailyFees: formatUSDValue(dailyData.feesUSD),
    loading,
    refetch,
  };
}