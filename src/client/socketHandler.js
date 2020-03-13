import { EVENTS } from '../../constants';

export default (socketClient, ui) => {
    socketClient.on(EVENTS.BROADCAST_MESSAGE, (data) => {
        ui.messagesList.innerHTML += 
        `<b> ${data.userName} - ${ data.currentDate }</b> <br> 
        <p> ${data.value}</p>`;
    });

    socketClient.on(EVENTS.BROADCAST_USERS, (userName) => {
        ui.userList.innerHTML += `<p> ${ userName } </p>`;
    });

    socketClient.on(EVENTS.BROADCAST_USERS_LIST, (activeUsers) => {
        ui.userList.innerHTML = '';
        activeUsers.forEach(user => {
        ui.userList.innerHTML += `<p>${ user.userName }</p>`
        });
    });
};