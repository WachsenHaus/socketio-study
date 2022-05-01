const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');
const room = document.querySelector('#room');

room.hidden = true;
let roomName = '';

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`you :${input.value}`);
  });
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector('#name input');
  const value = input.value;
  socket.emit('nickname', input.value);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;

  const msgForm = room.querySelector('#msg');
  const nameForm = room.querySelector('#name');
  msgForm.addEventListener('submit', handleMessageSubmit);
  nameForm.addEventListener('submit', handleNicknameSubmit);
};

const addMessage = (msg) => {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = msg;
  ul.appendChild(li);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector('input');
  roomName = input.value;
  socket.emit('enter_room', roomName, showRoom);
  input.value = '';
};

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerHTML = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived`);
});

// socket.on('bye', addMessage);
socket.on('bye', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerHTML = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived`);
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  if (rooms.length === 0) {
    roomList.innerHTML = '';
    return;
  }

  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});

// const messageList = document.querySelector('ul');
// const nickForm = document.querySelector('#nick');
// const messageForm = document.querySelector('#message');
// const socket = new WebSocket(`ws://${window.location.host}`);

// // time stamp
// // da

// const makeMessage = (type, payload) => {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// };

// socket.addEventListener('open', () => {
//   console.log('connected to browser');
// });

// socket.addEventListener('message', (message) => {
//   const li = document.createElement('li');
//   console.log(message);
//   li.innerText = message.data;
//   messageList.append(li);

//   console.log('서버가 보낸 매새지:', message.data);
// });

// socket.addEventListener('close', () => {
//   console.log('서버로부터 연결이 끊겼습니다.');
// });

// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector('input');
//   socket.send(makeMessage('new_message', input.value));
//   console.log(input.value);
// }
// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector('input');
//   //   const data = {
//   //     type: 'nickname',
//   //     payload: input.value,
//   //   };

//   socket.send(makeMessage('nickName', input.value));
// }
// messageForm.addEventListener('submit', handleSubmit);
// nickForm.addEventListener('submit', handleNickSubmit);
