export interface PoolDetails {
  token0: TokenDetails;
  token1: TokenDetails;
  totalValueLockedUSD: string;
  tickRange: {
    lower: string;
    upper: string;
  };
}

export interface TokenDetails {
  symbol: string;
  decimals: number;
  totalLocked: string;
  deposited: string;
  withdrawn: string;
}

export interface Pool {
  id: string;
  name: string;
  fee: string;
  tvl: string;
  volume24h: string;
  fees24h: string;
  feeToTVL: string;
  iconUrl?: string;
  token0Price?: string;
  token1Price?: string;
}

export interface TokenActivity {
  symbol: string;
  amount: string;
  value: string;
  timestamp: string;
}

export interface PoolPosition {
  id: string;
  poolName: string;
  fee: string;
  totalValue: string;
  token0: Token;
  token1: Token;
  apr: string;
  impermanentLoss: string;
  tickRange: {
    lower: string;
    upper: string;
    current: string;
  };
  range: {
    min: string;
    max: string;
    current: string;
    status: 'in-range' | 'out-of-range';
  };
  activity: {
    deposits: TokenActivity[];
    withdrawals: TokenActivity[];
  };
}

export interface PoolStats {
  tvl: string;
  volume24h: string;
  fees24h: string;
}