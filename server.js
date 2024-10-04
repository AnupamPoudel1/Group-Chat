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

io.on('connection', (socket) => {
    console.log(socket.id + ' user connected');
    socket.on('chat message', (msg) => {
        console.log(socket.id + " messaged: " + msg);
    })
    socket.on('disconnect', () => {
        console.log(socket.id + ' user disconnected');
    })
})

// url encoded
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});