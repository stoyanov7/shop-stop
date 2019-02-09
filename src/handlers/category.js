const url = require('url');
const path = require('path');
const fs = require('fs');
const qs = require('querystring');
const Category = require('../models/Category');

module.exports = (req, res) => {
     req.pathname = req.pathname || url.parse(req.url).pathname;

     if (req.pathname === '/category/add' && req.method === 'GET') {
          let filePath = path.normalize(path.join(__dirname, '../views/category/add.html'));

          fs.readFile(filePath, (err, data) => {
               if (err) {
                    console.log(err);

                    req.writeHead(404, {
                         'Content-Type': 'text/plain'
                    });

                    res.write('404 not found!');
                    res.end();
                    return;
               }

               res.writeHead(200, {
                    'Content-Type': 'text/html'
               });

               res.write(data);
               res.end();
          });
     } else if (req.pathname === '/category/add' && req.method === 'POST') {
          let queryData = '';

          req.on('data', (data) => {
               queryData += data;
          });

          req.on('end', () => {
               let category = qs.parse(queryData);
               Category.create(category).then(() => {
                    res.writeHead(302, {
                         Location: '/'
                    });

                    res.end();
               });
          });
     } else {
          return true;
     }
};