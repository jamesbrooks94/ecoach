import { makeExtendSchemaPlugin, gql } from 'postgraphile'
import { generateEmails } from '../services/mail'

export const extendSchema = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
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
    `,
    resolvers: {
      Mutation: {
        generateEmails: {
          async resolve(_parent, _args, { user, pgClient }) {
            console.log(build)

            return generateEmails(user.tenant, pgClient)
          },
        },
      },
      Query: {
        me: {
          async resolve(_parent, _args, { user, pgClient, ...c }, d) {
            await generateEmails(user.tenant, pgClient)
            return user
          },
        },
      },
    },
  }
})
