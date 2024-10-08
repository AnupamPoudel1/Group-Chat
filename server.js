// imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

// port
const PORT = process.env.port || 5000;

// App
const app = express();
// setting ip server
const server = createServer(app);

// setting up socket io
const io = new Server(server);

// function to count number of users connected in the socket

let connectedSockets = new Set();

const socketConnected = (socket) => {
    connectedSockets.add(socket.id);

    io.emit('totalClients', connectedSockets.size);

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    });

    socket.on('disconnect', () => {
        connectedSockets.delete(socket.id);
        io.emit('totalClients', connectedSockets.size);
    });
}

io.on('connection', socketConnected);

// url encoded
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});