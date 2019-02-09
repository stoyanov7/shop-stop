const url = require('url');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const shortid = require('shortid');
const Product = require('../models/Product');

module.exports = (req, res) => {
   req.pathname = req.pathname || url.parse(req.url).pathname;

   if (req.pathname === '/products/add' && req.method === 'GET') {
      let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'));

      fs.readFile(filePath, (err, data) => {
         if (err) {
            console.log(err);

            res.writeHead(404, {
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
   } else if (req.pathname === '/products/add' && req.method === 'POST') {
      let form = new multiparty.Form();
      let product = {};

      form.on('part', part => {
         if (part.filename) {
            let dataString = '';

            part.setEncoding('binary');

            part.on('data', d => {
               dataString += d;
            });

            part.on('end', () => {
               let filename = shortid.generate();
               let extension = part.filename.substring(part.filename.lastIndexOf('.'));
               let filePath = `/content/images/${filename}${extension}`;

               product.image = filePath;

               fs.writeFile(`.${filePath}`, dataString, { encoding: 'ascii' }, (err) => {
                  if (err) {
                     console.log(err);
                     return;
                  }
               });
            });
         } else {
            part.setEncoding('utf-8');
            let field = '';

            part.on('data', d => {
               field += d;
            });

            part.on('end', () => {
               product[part.name] = field;
            });
         }
      });

      form.on('close', () => {
         Product.create(product).then(() => {
            res.writeHead(302, {
               Location: '/'
            });

            res.end();
         });      
      });

      form.parse(req); 
   } else {
      return true;
   }
}; 