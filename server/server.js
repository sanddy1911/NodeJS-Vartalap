const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {genrateMessage, genrateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log("New User Connected");

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', genrateMessage("Admin", `${user.name} has left.`));
        }
    });

    socket.on('join', (param, callback) => {
        if(!isRealString(param.name) || !isRealString(param.room)) {
            return callback("Name and Room Name are Required")
        }
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);
        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        socket.emit('newMessage', genrateMessage("Admin", "Welcome to Vartalap!"));
        socket.broadcast.to(param.room).emit('newMessage', genrateMessage("Admin", `${param.name} Joined Vartalap!`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', genrateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMessage', genrateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log("Server started at port ",port);
});