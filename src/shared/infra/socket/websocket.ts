import { io } from '../http/app';

io.on('connection', socket => {
  console.info(socket.id);
});
