import { Logger, loggers, transports, format } from 'winston'
import { env } from '../config'

export const createLogger = (name: string): Logger => {
  const { LOG_LEVEL } = env
  const { combine, timestamp, printf, label, colorize } = format
  loggers.add(name, {
    level: LOG_LEVEL,
    format: combine(
      label({ label: name }),
      timestamp(),
      colorize(),
      printf(({ level, message, label: lbl, timestamp: stamp }) => {
        return `${stamp} [${level}] [${lbl}] ${message}`
      })
    ),
    transports: [new transports.Console()],
  })
  return loggers.get(name)
}
