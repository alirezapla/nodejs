import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.event} ${info.message}`)
    ),
    transports: [new transports.Console()]
});

