const pino = require('pino');

const pinoPretty = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    crlf: true,
    translateTime: 'SYS:standard',
  },
};

module.exports = (appName) =>
  pino(
    {
      name: appName,
      formatters: {
        level: (label) => ({
          level: label.toUpperCase(),
        }),
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      level: 'trace',
      redact: {
        paths: ['password', '*.password', 'token', 'authorization'],
        censor: '[REDACTED]',
      },
    },
    pino.transport(pinoPretty)
  );
