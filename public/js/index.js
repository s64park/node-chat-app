/**
 * Created by Terry on 2017-01-03.
 */
var socket = io();
socket.on('connect', function() {
    console.log('Connected to Server');

    socket.emit('createMessage', {
        from: 'Danny Park',
        text: 'This is sample text'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


socket.on('newMessage', function(msg) {
    console.log('newMessage', msg);
});