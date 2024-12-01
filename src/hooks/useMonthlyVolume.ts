import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { formatUSDValue } from '../lib/utils';

const GET_MONTHLY_VOLUME = gql`
  query GetMonthlyVolume($startDate: Int!, $endDate: Int!) {
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
    }
  }
`;

export function useMonthlyVolume() {
  // Calculate the start of the current month (Unix timestamp)
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startDate = Math.floor(startOfMonth.getTime() / 1000);
  const endDate = Math.floor(now.getTime() / 1000);

  const { data, loading, error } = useQuery(GET_MONTHLY_VOLUME, {
    variables: {
      startDate,
      endDate,
    },
  });

  // Aggregate volume data
  const monthlyData = data?.pancakeDayDatas.reduce(
    (acc: { totalVolume: string; dailyVolumes: Array<{ date: string; volume: string }> }, day: any) => {
      const volume = parseFloat(day.volumeUSD);
      const totalVolume = parseFloat(acc.totalVolume) + volume;
      
      return {
        totalVolume: totalVolume.toString(),
        dailyVolumes: [
          ...acc.dailyVolumes,
          {
            date: new Date(day.date * 1000).toLocaleDateString(),
            volume: formatUSDValue(day.volumeUSD),
          },
        ],
      };
    },
    { totalVolume: '0', dailyVolumes: [] }
  ) || { totalVolume: '0', dailyVolumes: [] };

  return {
    monthlyVolume: formatUSDValue(monthlyData.totalVolume),
    dailyVolumes: monthlyData.dailyVolumes,
    loading,
    error,
  };
}