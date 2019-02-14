const port = 3000;
const config = require('./config/config');
const databaseConfig = require('./config/database.config');
const express = require('express');

let app = express();
let environment = process.env.NODE_ENV || 'development';

databaseConfig(config[environment]);
app.listen(port);