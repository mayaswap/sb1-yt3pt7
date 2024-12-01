import { formatUSDValue } from './utils';

const DEXSCREENER_API_BASE = 'https://api.dexscreener.com/latest';

interface TokenPrice {
  priceUsd: string | null;
  priceNative: string | null;
}

interface PriceCache {
  [key: string]: {
    price: TokenPrice;
    timestamp: number;
  }
}

// In-memory cache to avoid hitting rate limits
const priceCache: PriceCache = {};
const CACHE_DURATION = 60 * 1000; // 1 minute

export async function getTokenPrice(tokenAddress: string, chainId: string = '369'): Promise<TokenPrice> {
  const cacheKey = `${chainId}-${tokenAddress}`;
  const now = Date.now();

  // Check cache first
  if (priceCache[cacheKey] && (now - priceCache[cacheKey].timestamp) < CACHE_DURATION) {
    return priceCache[cacheKey].price;
  }

  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/dex/tokens/${tokenAddress}`);
    const data = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return { priceUsd: null, priceNative: null };
    }

    // Find the pair for the specified chain
    const chainPairs = data.pairs.filter((pair: any) => pair.chainId === chainId);
    if (chainPairs.length === 0) {
      return { priceUsd: null, priceNative: null };
    }

    // Use the pair with highest liquidity
    const bestPair = chainPairs.reduce((best: any, current: any) => {
      return (current.liquidity?.usd || 0) > (best.liquidity?.usd || 0) ? current : best;
    }, chainPairs[0]);

    const price = {
      priceUsd: bestPair.priceUsd,
      priceNative: bestPair.priceNative
    };

    // Update cache
    priceCache[cacheKey] = {
      price,
      timestamp: now
    };

    return price;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return { priceUsd: null, priceNative: null };
  }
}

export async function calculateTokenValue(
  amount: string,
  decimals: number,
  tokenAddress: string,
  chainId: string = '369'
): Promise<string> {
  try {
    const tokenPrice = await getTokenPrice(tokenAddress, chainId);
    if (!tokenPrice.priceUsd) {
      return '$0.00';
    }

    const value = (parseFloat(amount) / Math.pow(10, decimals)) * parseFloat(tokenPrice.priceUsd);
    return formatUSDValue(value.toString());
  } catch (error) {
    console.error('Error calculating token value:', error);
    return '$0.00';
  }
}

export async function calculateTotalValue(
  token0Amount: string,
  token0Decimals: number,
  token0Address: string,
  token1Amount: string,
  token1Decimals: number,
  token1Address: string,
  chainId: string = '369'
): Promise<string> {
  try {
    const [token0Value, token1Value] = await Promise.all([
      calculateTokenValue(token0Amount, token0Decimals, token0Address, chainId),
      calculateTokenValue(token1Amount, token1Decimals, token1Address, chainId)
    ]);

    const total = 
      parseFloat(token0Value.replace(/[^0-9.-]+/g, '')) + 
      parseFloat(token1Value.replace(/[^0-9.-]+/g, ''));

    return formatUSDValue(total.toString());
  } catch (error) {
    console.error('Error calculating total value:', error);
    return '$0.00';
  }
}