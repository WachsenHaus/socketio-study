import http from 'http';
import express from 'express';
import WebSocket from 'ws';
import { parse } from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));
console.log('heello');

const handleListen = () => console.log('listening on http://localhost:3000');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on('connection', (socket) => {
  //   console.log(socket);
  sockets.push(socket);
  // socket에 원하는 필드를 넣을 수 있다.
  socket['nickname'] = '익명';
  socket.on('close', () => console.log('브라우저로부터 연결이 끊겼습니다.'));
  console.log('connected to server');
  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    console.log(message);
    switch (message.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname} : ${message.payload}`)
        );
        break;
      case 'nickName':
        socket['nickname'] = message.payload;
        console.log(message.payload);
        break;
      default:
        break;
    }
  });
  //   socket.send('hello!!!');
});

server.listen(3000, handleListen);
