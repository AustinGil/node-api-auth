const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/users');

// Setup mongoose to use ES6 Promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api-auth');

const app = express();

app.use(morgan('dev')) // request logging
app.use(bodyParser.json())

app.use('/users', routes)

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server listening at ${port}`)