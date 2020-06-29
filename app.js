const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connection = require('./src/helpers/mysql');
const routes = require('./src/routes/index');
const cors = require('cors');

connection.connect(function(error) {
  if (error) throw error;
  console.log('Database has connected!');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.listen(3000, function() {
  console.log('posapp-api running at port 3000!');
});
