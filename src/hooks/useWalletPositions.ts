import { useQuery } from '@apollo/client';
import { GET_WALLET_POSITIONS } from '../graphql/queries';
import { formatTokenValue } from '../lib/utils';

export function useWalletPositions(walletAddress: string | null) {
  const { data, loading, error, refetch } = useQuery(GET_WALLET_POSITIONS, {
    variables: { owner: walletAddress || '' },
    skip: !walletAddress,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  // Calculate price from tick
  const getPrice = (tick: number) => {
    const price = Math.pow(1.0001, -tick);
    return Number(price.toFixed(7));
  };

  // Filter out positions with zero liquidity
  const positions = data?.positions
    .filter((position: any) => position.liquidity !== '0')
    .map((position: any) => {
      const token0 = position.pool.token0;
      const token1 = position.pool.token1;
      
      const formatTokenAmount = (amount: string) => {
        const num = parseFloat(amount);
        return formatTokenValue(num);
      };

      // Calculate if position is in range
      const currentTick = parseInt(position.pool.tick);
      const tickLower = parseInt(position.tickLower?.tickIdx || '0');
      const tickUpper = parseInt(position.tickUpper?.tickIdx || '0');
      const inRange = currentTick >= tickLower && currentTick <= tickUpper;

      // Calculate prices using the new formula
      const currentPrice = getPrice(currentTick);
      const minPrice = getPrice(tickLower);
      const maxPrice = getPrice(tickUpper);

      return {
        id: position.id,
        poolId: position.pool.id,
        poolName: `${token0.symbol}-${token1.symbol}`,
        fee: `${(position.pool.feeTier / 10000).toFixed(2)}%`,
        token0: {
          symbol: token0.symbol,
          decimals: token0.decimals,
          address: token0.id,
          deposited: formatTokenAmount(position.depositedToken0),
          withdrawn: formatTokenAmount(position.withdrawnToken0),
          price: `${currentPrice.toFixed(7)} ${token1.symbol}`
        },
        token1: {
          symbol: token1.symbol,
          decimals: token1.decimals,
          address: token1.id,
          deposited: formatTokenAmount(position.depositedToken1),
          withdrawn: formatTokenAmount(position.withdrawnToken1),
          price: `${(1 / currentPrice).toFixed(7)} ${token0.symbol}`
        },
        liquidity: position.liquidity,
        range: {
          min: minPrice.toString(),
          max: maxPrice.toString(),
          current: currentPrice.toString(),
          status: inRange ? 'in-range' : 'out-of-range'
        }
      };
    }) || [];

  return {
    positions,
    loading,
    error,
    refetch,
  };
}