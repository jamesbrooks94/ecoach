import express from 'express'
import { postgraphile } from 'postgraphile'

const app = express()

app.use(
  postgraphile(process.env.PG_CONNECTION_STRING || 'postgres://postgres@localhost:5432/ecoach', 'public', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    graphiqlRoute: '/',
  })
)

app.listen(process.env.PORT || 8000)
