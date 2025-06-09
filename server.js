const users = {}; // socket.id -> username

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // When a new user joins and sends username
  socket.on('new user', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('notification', `🔵 ${username} has joined the chat`);
  });

  // Receive chat message with username from client
  socket.on('chat message', ({ username, message }) => {
    io.emit('chat message', { username, message });
  });

  // When user disconnects
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      socket.broadcast.emit('notification', `🔴 ${username} has left the chat`);
      delete users[socket.id];
    }
    console.log('User disconnected:', socket.id);
  });
});
