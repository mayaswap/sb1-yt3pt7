import { useApolloClient } from '@apollo/client';

export function useMetricsRefresh() {
  const client = useApolloClient();

  const refreshMetrics = async () => {
    // Only refetch the specific metric queries when requested
    await client.refetchQueries({
      include: ['GetProtocolMetrics'],
    });
  };

  const refreshMonthlyMetrics = async () => {
    await client.refetchQueries({
      include: ['GetMonthlyMetrics'],
    });
  };

  const refreshDailyMetrics = async () => {
    await client.refetchQueries({
      include: ['GetDailyMetrics'],
    });
  };

  return { 
    refreshMetrics,
    refreshMonthlyMetrics,
    refreshDailyMetrics,
  };
}