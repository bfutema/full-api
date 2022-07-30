import { server } from './app';

import '../socket/websocket';

server.listen(process.env.PORT, () => {
  console.info(`🚀 Server started on port ${process.env.PORT}!`);
});
