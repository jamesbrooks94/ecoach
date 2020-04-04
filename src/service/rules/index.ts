import { rule, shield } from 'graphql-shield'
import { makeProcessSchemaPlugin } from 'postgraphile'
import { applyMiddleware } from 'graphql-middleware'
import { createLogger } from '../logger'

const logger = createLogger('ecoach-permissions')

const fallbackRule = rule()((_a, _b, { user }, { fieldName }) => {
  logger.info(`${user} requested ${fieldName}`)
  return true
})

const permissions = shield(
  {
    Query: {
      '*': fallbackRule,
    },
    Mutation: {
      '*': fallbackRule,
    },
  },
  {
    fallbackError: Error('You may not have permissions to perform this action'),
    allowExternalErrors: true, // Show internal errors
  }
)

export const plugin = makeProcessSchemaPlugin((schema) => applyMiddleware(schema, permissions))
