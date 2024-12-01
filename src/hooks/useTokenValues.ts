import { useState, useEffect } from 'react';
import { calculateTokenValue, calculateTotalValue } from '../lib/price';

interface TokenValuesProps {
  token0Amount: string;
  token0Decimals: number;
  token0Address: string;
  token1Amount: string;
  token1Decimals: number;
  token1Address: string;
  chainId?: string;
}

export function useTokenValues({
  token0Amount,
  token0Decimals,
  token0Address,
  token1Amount,
  token1Decimals,
  token1Address,
  chainId = '369'
}: TokenValuesProps) {
  const [values, setValues] = useState({
    token0Value: '$0.00',
    token1Value: '$0.00',
    totalValue: '$0.00',
    loading: true,
    error: null as string | null
  });

  useEffect(() => {
    let mounted = true;

    async function fetchValues() {
      try {
        const [token0Value, token1Value, totalValue] = await Promise.all([
          calculateTokenValue(token0Amount, token0Decimals, token0Address, chainId),
          calculateTokenValue(token1Amount, token1Decimals, token1Address, chainId),
          calculateTotalValue(
            token0Amount,
            token0Decimals,
            token0Address,
            token1Amount,
            token1Decimals,
            token1Address,
            chainId
          )
        ]);

        if (mounted) {
          setValues({
            token0Value,
            token1Value,
            totalValue,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (mounted) {
          setValues(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to fetch token values'
          }));
        }
      }
    }

    fetchValues();

    // Refresh values every minute
    const interval = setInterval(fetchValues, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [
    token0Amount,
    token0Decimals,
    token0Address,
    token1Amount,
    token1Decimals,
    token1Address,
    chainId
  ]);

  return values;
}