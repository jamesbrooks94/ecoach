import gql from 'graphql-tag'

export const ME = gql`
  query {
    me {
      id
      name
      email
      roles
      tenant
    }
  }
`

export const GET_USERS = gql`
  query($tenant: Int!) {
    applicationById(id: $tenant) {
      id
      members: membersByApplication {
        edges {
          node {
            id
            firstName
            surname
          }
        }
      }
    }
  }
`
