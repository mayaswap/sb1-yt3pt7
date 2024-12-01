import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://info-api.9mm.pro/subgraphs/name/pulsechain/9mm-v3',
  cache: new InMemoryCache(),
});