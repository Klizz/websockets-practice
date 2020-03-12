import { EVENTS } from "../../constants";

export default socketClient => {
  socketClient.emit(EVENTS.TEST, { values: "hello" });
  const message = document.getElementById('message');
  const sendMessage = document.getElementById('send-message');
  const messagesList = document.getElementById('messages-list');

  sendMessage.addEventListener("click", () => {
    socketClient.emit(EVENTS.SEND_MESSAGE, { value: message.value });
    message.value = "";
  });

  return {
      messagesList
  }
};
