import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';

dotenv.config();

const APP = express();

APP.use(express.static('dist'));
APP.set('views', './src/server/views');
APP.set('view engine', 'pug');
APP.use(bodyParser.json());

const SERVER = http.createServer(APP);

APP.get('/', (req, res) => {
  res.render("home");
});

SERVER.listen(4000);