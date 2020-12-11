import React from 'react'
import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ApolloLink, HttpLink } from '@apollo/client/core'
import { buildClientSchema, IntrospectionQuery } from 'graphql'
import { withScalars } from 'apollo-link-scalars'


import AssignmentList from './components/AssignmentList'
import introspectionResult from './interfaces/introspection.json'

// We define a custom mapping to be used by apollo-link-scalars
const schema = buildClientSchema((introspectionResult as unknown) as IntrospectionQuery)
const typesMap = {
  DateTime: {
    serialize: (parsed: Date) => parsed.toJSON(),
    parseValue: (raw: string | null): Date | null => {
      return raw ? new Date(raw) : null;
    }
  }
};
const link = ApolloLink.from([
  withScalars({ schema, typesMap }),
  new HttpLink({ uri: 'http://localhost:4000/' })
]);

const client = new ApolloClient({
  // Note the newly added ApolloLink, e.g. a chain to resolve the network traffic
  link,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Hello, GraphQL Workshop! 🚀</h2>
      </div>
      <AssignmentList></AssignmentList>
    </ApolloProvider>
  )
}

export default App
