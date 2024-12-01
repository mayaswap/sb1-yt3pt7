import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { formatUSDValue } from '../lib/utils';

const GET_MONTHLY_METRICS = gql`
  query GetMonthlyMetrics($startDate: Int!, $endDate: Int!) {
    pancakeDayDatas(
      first: 31
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

export function useMonthlyMetrics() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startDate = Math.floor(startOfMonth.getTime() / 1000);
  const endDate = Math.floor(now.getTime() / 1000);

  const { data, loading, refetch } = useQuery(GET_MONTHLY_METRICS, {
    variables: {
      startDate,
      endDate,
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  const monthlyData = data?.pancakeDayDatas.reduce(
    (acc: { totalVolume: string; totalFees: string }, day: any) => ({
      totalVolume: (parseFloat(acc.totalVolume) + parseFloat(day.volumeUSD)).toString(),
      totalFees: (parseFloat(acc.totalFees) + parseFloat(day.feesUSD)).toString(),
    }),
    { totalVolume: '0', totalFees: '0' }
  ) || { totalVolume: '0', totalFees: '0' };

  return {
    monthlyVolume: formatUSDValue(monthlyData.totalVolume),
    monthlyFees: formatUSDValue(monthlyData.totalFees),
    loading,
    refetch,
  };
}