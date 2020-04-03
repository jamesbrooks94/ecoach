import { config } from 'dotenv'
import { cleanEnv, str, port } from 'envalid'

config()

export const env = cleanEnv(
  process.env,
  {
    PORT: port({ devDefault: 3000 }),
    DB_CONNECTION: str({ devDefault: 'postgres://postgres@localhost:5432/ecoach' }),
  },
  {
    reporter: ({ errors }) => {
      if (errors.length) {
        console.error('Error(s) in env vars:')
        console.error(errors)
        console.error('Env:')
        console.error(JSON.stringify(env))
        process.exit(1)
      }
    },
  }
)

process.env = env
