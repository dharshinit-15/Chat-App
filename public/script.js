const socket = io();

let username = '';

// Get DOM elements
const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');
const usernameInput = document.getElementById('username-input');
const usernameBtn = document.getElementById('username-btn');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// When user clicks "Join Chat"
usernameBtn.addEventListener('click', () => {
  const enteredName = usernameInput.value.trim();
  if (enteredName) {
    username = enteredName;
    socket.emit('new user', username);
    loginDiv.style.display = 'none';
    chatDiv.style.display = 'block';
  } else {
    alert('Please enter a username');
  }
});

// Send a message with username
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!username) {
    alert('Please enter your username first!');
    return;
  }
  const msg = input.value.trim();
  if (msg) {
    socket.emit('chat message', { username, message: msg });
    input.value = '';
  }
});

// Receive chat messages with username
socket.on('chat message', ({ username: user, message }) => {
  const li = document.createElement('li');
  li.textContent = `${user}: ${message}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// Receive notifications (user joined/left)
socket.on('notification', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.classList.add('notification');
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
