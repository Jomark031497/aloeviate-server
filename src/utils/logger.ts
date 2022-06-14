import logger from 'pino';
import { format } from 'date-fns';

const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time": "${format(new Date(), 'hh:mm:ss a MM-dd-yyyy')}"`,
});

export default log;
