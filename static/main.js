const socket = io('/');

socket.on('greeting', (data) => console.log(data));
socket.emit('greeting', 'hello server');
