const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const username = document.getElementById('name-input');
const messageContaoner = document.getElementById('message-container');
const clients = document.getElementById('totalClients');

socket.on('totalClients', (data) => {
    console.log(data);
    clients.innerText = `Total clients: ${data}`;
});

const sendMessage = () => {
    const msg = {
        name: username.value,
        message: input.value,
        date: new Date()
    }
    socket.emit('chat message', msg);
    input.value = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        sendMessage();
    }
});

socket.on('message', (msg) => {
    console.log(msg);
})