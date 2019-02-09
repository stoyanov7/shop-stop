const http = require('http');
const port = 3000;
const handlers = require('./handlers');

let environment = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const databaseConfig = require('./config/database.config');

databaseConfig(config[environment]);

http.createServer((req, res) => {
     for (let handler of handlers) {
         if (!handler(req, res)) {
              break;
         } 
     }
}).listen(port);