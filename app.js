const express = require('express');
require('dotenv').config();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connection = require('./src/helpers/mysql');
const routes = require('./src/routes/index');
const cors = require('cors');

connection.connect(function(error) {
  if (error) throw error;
  console.log('Database has connected!');
});

io.on('connection', socket => {
  console.log('a user connected!');
  socket.on('chat-message', msg => {
    console.log(msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.static('uploads'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/', routes);

server.listen(3000, function() {
  console.log('posapp-api running at port 3000!');
});
