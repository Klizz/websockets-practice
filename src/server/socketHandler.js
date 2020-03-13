import { EVENTS } from '../../constants';

export default (activeUsers, io) => (socket) => {
  socket.on(EVENTS.TEST, (data) => {
    console.log('test connection', data);
  });

  socket.on(EVENTS.SEND_MESSAGE, (data) => {
    console.log(data, socket.id);
    data.currentDate = new Date(Date.now());

  if (activeUsers.indexOf(data.userName) === -1) {
    activeUsers.push({
      id: socket.id,
      userName: data.userName
    });
    io.emit(EVENTS.BROADCAST_USERS, data.userName)
  }
    io.emit(EVENTS.BROADCAST_MESSAGE, data);
  });

  socket.on(EVENTS.DISCONNECT, () => {
    activeUsers = activeUsers.filter(u => u.id !== socket.id);
    console.log(activeUsers);
    console.log("disconnected", socket.id);
  })
};