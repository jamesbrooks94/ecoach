import { makeExtendSchemaPlugin } from 'postgraphile'
import { generateEmails } from '../services/mail'
import typeDefs from './typedefs'

export const extendSchema = makeExtendSchemaPlugin(build => {
  return {
    typeDefs,
    resolvers: {
      Mutation: {
        generateEmails: (_parent, _args, { user, pgClient }) =>
          generateEmails(user?.tenant || 1, pgClient),
      },
      Query: {
        me: (_parent, _args, { user }) => user,
      },
    },
  }
})
