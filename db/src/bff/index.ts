import express from 'express'
import { env } from '../config'
import { createLogger } from '../logger'

const logger = createLogger('ecoach-bff')

const init = () => {
  const bff = express()
  bff.get('/', (_, res) => {
    res.send('Yes!')
  })

  bff.listen(env.BFF_PORT, () => {
    logger.info(`Listening on port ${env.BFF_PORT}`)
  })
}

export default init
