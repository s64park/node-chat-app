/**
 * Created by Terry on 2017-01-03.
 */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected');

   socket.emit('newMessage', {
       from: 'Danny Park',
       text: 'See you then',
       createdAt: 131233
   });

   socket.on('createMessage', (createMessage) => {
       console.log('createMessage', createMessage);
   });

   socket.on('disconnect', () => {
      console.log('User was disconnected');
   });
});

server.listen(port, () => {
    console.log('Server is up on port 3000');
});