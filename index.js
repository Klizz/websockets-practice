import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import socketHandler from './src/server/socketHandler';

dotenv.config();

const APP = express();
const SERVER = http.createServer(APP);

APP.use(express.static('dist'));
APP.set('views', './src/server/views');
APP.set('view engine', 'pug');
APP.use(bodyParser.json());

const activeUsers = [];
const sentMessages = [];

const io = socketio(SERVER);
io.set('transports', ['websocket', 'polling']);
io.on('connection', socketHandler(activeUsers, sentMessages, io));

APP.get('/', (req, res) => {
  res.render("home");
});

SERVER.listen(4000);