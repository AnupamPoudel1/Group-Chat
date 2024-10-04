const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const username = document.getElementById('name-input');
const messageContainer = document.getElementById('message-container');
const messageFeedback = document.getElementById('message-feedback')
const clients = document.getElementById('totalClients');

socket.on('totalClients', (data) => {
    console.log(data);
    clients.innerText = `Total clients: ${data}`;
});

const addMessages = (isOwn, msg) => {
    const element = isOwn ?
        `
            <li class="right-msg max-w-[80%] w-max my-2 inline-flex ml-auto">
              <div
                class="msg inline-flex flex-col border border-gray-800 bg-gray-800 rounded-tr-md rounded-bl-md rounded-tl-md px-2 py-1"
              >
                <p class="text-base text-gray-50 font-medium text-left">
                    ${msg.message}
                </p>
                <span class="text-xs text-gray-200 font-light mt-1">
                    ${msg.name} 💙 ${msg.date}
                </span>
              </div>
            </li>
        `
        :
        `
            <li class="left-msg max-w-[80%] w-max my-2 inline-flex">
              <div
                class="msg inline-flex flex-col border border-gray-200 bg-gray-200 rounded-tr-md rounded-br-md rounded-tl-md px-2 py-1"
              >
                <p class="text-base text-black font-medium">
                    ${msg.message}
                </p>
                <span class="text-xs text-gray-600 font-light mt-1">
                    ${msg.name} 💙 ${msg.date}
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
    console.log(msg);
    addMessages(false, msg);
});
