import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { persistCache } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getAccessToken } from '../../utils/auth0'
import { createHttpLink } from 'apollo-link-http'
let accessToken: string

const batchHttpLink = createHttpLink({
  uri: `/graphql`,
})

const authLink = new ApolloLink((operation, forward) => {
  if (!accessToken) {
    accessToken = getAccessToken()
  }

  operation.setContext({
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return forward(operation)
})

const getClient = async () => {
  const cache = new InMemoryCache()

  await persistCache({
    storage: window.localStorage,
    cache,
  } as any)

  const client = new ApolloClient({
    cache,
    link: authLink.concat(batchHttpLink),
  })

  return client
}

export default getClient
