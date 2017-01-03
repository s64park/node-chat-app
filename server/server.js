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

   socket.on('createMessage', (message) => {
       console.log('createMessage', message);
       //io is for every single connection
       io.emit('newMessage', {
           from: message.from,
           text: message.text,
           createdAt: new Date().getTime()
       })
   });

    //socket is for single connection
   socket.on('disconnect', () => {
      console.log('User was disconnected');
   });
});

server.listen(port, () => {
    console.log('Server is up on port 3000');
});