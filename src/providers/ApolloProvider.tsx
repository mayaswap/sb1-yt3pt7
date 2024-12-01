import React from 'react';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
}