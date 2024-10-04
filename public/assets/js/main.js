const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});