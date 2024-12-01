import { Pool } from '../types/pool';

const generateMockPool = (id: number): Pool => {
  const tokens = ['PLS', 'HEX', 'PLSX', 'INC', 'LOAN', 'TIME', 'BTC', 'ETH', 'DAI', 'USDC'];
  const fees = ['0.01%', '0.05%', '0.3%', '1%', '2%', '5%'];
  const steps = ['100', '125', '150', '175', '200', '250'];
  
  const randomToken1 = tokens[Math.floor(Math.random() * tokens.length)];
  let randomToken2 = tokens[Math.floor(Math.random() * tokens.length)];
  while (randomToken2 === randomToken1) {
    randomToken2 = tokens[Math.floor(Math.random() * tokens.length)];
  }

  const tvl = (Math.random() * 1000000).toFixed(2);
  const volume = (Math.random() * 2000000).toFixed(2);
  const fee = fees[Math.floor(Math.random() * fees.length)];
  const feeNum = parseFloat(fee) / 100;
  const fees24h = (parseFloat(volume) * feeNum).toFixed(2);
  const feeToTVL = ((parseFloat(fees24h) / parseFloat(tvl)) * 100).toFixed(2);

  return {
    id: id.toString(),
    name: `${randomToken1}-${randomToken2}`,
    fee,
    step: `BIN STEP ${steps[Math.floor(Math.random() * steps.length)]}`,
    tvl: `$${(parseFloat(tvl) / 1000).toFixed(2)}K`,
    volume24h: `$${(parseFloat(volume) / 1000).toFixed(2)}K`,
    fees24h: `$${(parseFloat(fees24h) / 1000).toFixed(2)}K`,
    feeToTVL: `${feeToTVL}%`,
  };
};

export const MOCK_POOLS: Pool[] = Array.from({ length: 100 }, (_, i) => 
  generateMockPool(i + 1)
);

export const calculatePoolStats = (pools: Pool[]) => {
  const stats = pools.reduce((acc, pool) => {
    const tvl = parseFloat(pool.tvl.replace(/[$K]/g, '')) * 1000;
    const volume = parseFloat(pool.volume24h.replace(/[$K]/g, '')) * 1000;
    const fees = parseFloat(pool.fees24h.replace(/[$K]/g, '')) * 1000;
    
    return {
      tvl: acc.tvl + tvl,
      volume24h: acc.volume24h + volume,
      fees24h: acc.fees24h + fees,
    };
  }, { tvl: 0, volume24h: 0, fees24h: 0 });

  return {
    tvl: `$${(stats.tvl / 1000000).toFixed(2)}M`,
    volume24h: `$${(stats.volume24h / 1000000).toFixed(2)}M`,
    fees24h: `$${(stats.fees24h / 1000).toFixed(2)}K`,
  };
};