const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);

// time stamp
// da

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener('open', () => {
  console.log('connected to browser');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  console.log(message);
  li.innerText = message.data;
  messageList.append(li);

  console.log('서버가 보낸 매새지:', message.data);
});

socket.addEventListener('close', () => {
  console.log('서버로부터 연결이 끊겼습니다.');
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  console.log(input.value);
}
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  //   const data = {
  //     type: 'nickname',
  //     payload: input.value,
  //   };

  socket.send(makeMessage('nickName', input.value));
}
messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
