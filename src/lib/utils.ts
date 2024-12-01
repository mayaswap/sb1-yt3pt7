import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: string, decimals: number = 18) => {
  return (Number(balance) / 10 ** decimals).toFixed(4);
};

export const formatUSDValue = (value: string) => {
  const num = parseFloat(value);
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

export const formatTokenValue = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toFixed(2);
};

export const calculateFeeToTVL = (fees: string, tvl: string) => {
  const feesNum = parseFloat(fees);
  const tvlNum = parseFloat(tvl);
  if (tvlNum === 0) return '0%';
  return `${((feesNum / tvlNum) * 100).toFixed(2)}%`;
};

export const getSortableValue = (value: string): number => {
  // Remove any non-numeric characters except dots and negative signs
  const cleanValue = value.replace(/[^0-9.-]/g, '');
  
  // Handle percentage values
  if (value.includes('%')) {
    return parseFloat(cleanValue);
  }
  
  // Handle K/M/B suffixes
  const multipliers: { [key: string]: number } = {
    'K': 1000,
    'M': 1000000,
    'B': 1000000000
  };
  
  for (const [suffix, multiplier] of Object.entries(multipliers)) {
    if (value.includes(suffix)) {
      return parseFloat(cleanValue) * multiplier;
    }
  }
  
  return parseFloat(cleanValue);
};

export const calculatePrice = (sqrtPrice: string) => {
  const sqrtPriceBigInt = BigInt(sqrtPrice);
  const Q96 = BigInt(2) ** BigInt(96);
  return Number((sqrtPriceBigInt * sqrtPriceBigInt) / (Q96 * Q96));
};

export const getTickPrice = (tick: number) => Math.pow(1.0001, tick);

export const isPositionInRange = (currentTick: number, tickLower: number, tickUpper: number) => {
  return currentTick >= tickLower && currentTick <= tickUpper;
};