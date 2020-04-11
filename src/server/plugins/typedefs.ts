import { gql } from 'postgraphile'

export default gql`
  type UserInfo {
    id: String!
    name: String!
    tenant: Int!
    email: String!
    roles: [String!]
  }
  extend type Query {
    me: UserInfo
  }
  extend type Mutation {
    generateEmails: Boolean
  }
`
