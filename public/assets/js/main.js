const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const username = document.getElementById('name-input');
const messageContainer = document.getElementById('message-container');
const messageFeedback = document.getElementById('feedback')
const clients = document.getElementById('totalClients');

socket.on('totalClients', (data) => {
    clients.innerText = `Total clients: ${data}`;
});

const removeFeedback = () => {
    document.querySelectorAll('p.feedbackMsg').forEach(element => {
        element.parentNode.removeChild(element);
    });
}

const addMessages = (isOwn, msg) => {

    removeFeedback();

    const element = isOwn ?
        `
            <li class="right-msg max-w-[80%] w-max my-2 inline-flex ml-auto shadow-lg">
              <div
                class="msg inline-flex flex-col border border-gray-800 bg-gray-800 rounded-tr-md rounded-bl-md rounded-tl-md px-2 py-1"
              >
                <p class="text-base text-gray-50 font-medium text-left">
                    ${msg.message}
                </p>
                <span class="text-xs text-gray-200 font-light mt-1">
                    ${msg.name} - ${msg.date}
                </span>
              </div>
            </li>
        `
        :
        `
            <li class="left-msg max-w-[80%] w-max my-2 inline-flex shadow-lg">
              <div
                class="msg inline-flex flex-col border border-gray-200 bg-gray-200 rounded-tr-md rounded-br-md rounded-tl-md px-2 py-1"
              >
                <p class="text-base text-black font-medium">
                    ${msg.message}
                </p>
                <span class="text-xs text-gray-600 font-light mt-1">
                    ${msg.name} - ${msg.date}
                </span>
              </div>
            </li>
        `
    messageContainer.innerHTML += element;
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

const sendMessage = () => {

    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nove", "Dec"]

    const sentDate = day + " " + months[month] + " " + hours + ":" + minutes;

    const msg = {
        name: username.value,
        message: input.value,
        date: sentDate
    }
    socket.emit('chat message', msg);
    addMessages(true, msg);
    input.value = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        sendMessage();
    }
});

socket.on('message', (msg) => {
    addMessages(false, msg);
});

input.addEventListener('focus', (e) => {
    socket.emit('feedback', {
        feedback: `${username.value} is typing a message .....`
    });
});
input.addEventListener('keypress', (e) => {
    socket.emit('feedback', {
        feedback: `${username.value} is typing a message .....`
    });
});

input.addEventListener('blur', (e) => {
    socket.emit('feedback', {
        feedback: ``
    });
});

socket.on('feedback', (data) => {
    removeFeedback();
    const text = `<p class="feedbackMsg">${data.feedback}</p>`
    messageFeedback.innerHTML += text;
});
