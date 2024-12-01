import { gql } from '@apollo/client';

export const GET_POOLS = gql`
  query GetPools($first: Int!, $skip: Int!) {
    pools(
      first: $first
      skip: $skip
      orderBy: totalValueLockedUSD
      orderDirection: desc
      where: { totalValueLockedUSD_gt: "0" }
    ) {
      id
      feeTier
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
      token0Price
      token1Price
      volumeUSD
      totalValueLockedUSD
      feesUSD
    }
  }
`;

export const GET_POOL = gql`
  query GetPool($id: ID!) {
    pool(id: $id) {
      id
      feeTier
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
      token0Price
      token1Price
      volumeUSD
      totalValueLockedUSD
      feesUSD
    }
  }
`;

export const GET_PROTOCOL_METRICS = gql`
  query GetProtocolMetrics {
    _meta {
      block {
        number
      }
    }
    factories(first: 1) {
      totalVolumeUSD
      totalFeesUSD
      totalValueLockedUSD
    }
  }
`;

export const GET_WALLET_POSITIONS = gql`
  query GetWalletPositions($owner: String!) {
    positions(
      where: {
        owner: $owner,
        liquidity_gt: "0"
      }
    ) {
      id
      liquidity
      depositedToken0
      depositedToken1
      withdrawnToken0
      withdrawnToken1
      tickLower {
        tickIdx
      }
      tickUpper {
        tickIdx
      }
      pool {
        id
        token0Price
        token1Price
        tick
        token0 {
          id
          symbol
          decimals
        }
        token1 {
          id
          symbol
          decimals
        }
        feeTier
      }
    }
  }
`;