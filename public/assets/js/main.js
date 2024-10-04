const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const name = document.getElementById('name-input');
const messageContaoner = document.getElementById('message-container');
const clients = document.getElementById('totalClients');

socket.on('totalClients', (data) => {
    console.log(data);
    clients.innerText = `Total clients: ${data}`;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});