import gql from 'graphql-tag'

export const GET_CURRENT_TENANT = gql`
  query($tenant: Int!) {
    application: applicationById(id: $tenant) {
      id
      name
    }
  }
`
