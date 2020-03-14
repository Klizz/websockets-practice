import { EVENTS } from '../../constants';

export default (activeUsers, io) => (socket) => {
  socket.on(EVENTS.TEST, (data) => {
    console.log('test connection', data);
  });

  function clock() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let date = today.getDate() + '-' + ( today.getMonth() + 1 ) + '-' + today.getFullYear();
    let time = h + ":" + m + " hrs";
    return (
        date + " at " + time
    );
  }

  socket.on(EVENTS.SEND_MESSAGE, (data) => {
    console.log(data, socket.id);
    data.currentDate = clock();

  if (activeUsers.indexOf(data.userName) === -1) {
    activeUsers.push({
      id: socket.id,
      userName: data.userName
    });
    socket.emit(EVENTS.BROADCAST_USERS, data.userName);
  }
    socket.emit(EVENTS.BROADCAST_MESSAGE, data);
  });

  socket.on(EVENTS.DISCONNECT, () => {
    activeUsers = activeUsers.filter(u => u.id !== socket.id);
    console.log(activeUsers);
    console.log("disconnected", socket.id);
    socket.emit(EVENTS.BROADCAST_USERS_LIST, activeUsers);
  })
};