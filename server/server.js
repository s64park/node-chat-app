/**
 * Created by Terry on 2017-01-03.
 */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
        //Case insensitive
        params.room = params.room.toLowerCase()
        socket.join(params.room);
        var user = users.addUser(socket.id, params.name, params.room);
        if(user) {
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined` ));

            callback(null, user);
        } else {
            callback(`Please choose different display name to join ${params.room}`);
        }


    });

   socket.on('createMessage', (message, callback) => {
       var user = users.getUser(socket.id);
       if(user && isRealString(message.text)) {
           //io is for every single connection
           io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
       }
       callback();
   });

   socket.on('createLocationMessage', (coords) => {
       var user = users.getUser(socket.id);
       if(user) {
           //io is for every single connection
           io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
       }
   });

    //socket is for single connection
   socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);
      if (user) {
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
      }
   });
});

server.listen(port, () => {
    console.log('Server is up on port 3000');
});