const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/socketio', express.static(
    path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/controller', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'controller.html'));
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Running at port ${port}`));

const io = socketio(server);
let primarySocket = null;

io.of('/').on('connection', (socket) => primarySocket = socket);
io.of('/controller').on('connection', (socket) => {
    socket.on('deviceorientation', (e) => {
        primarySocket.emit('deviceorientation', e);
    });
});
