const path = require('path');
const fs = require('fs');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
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
};

module.exports.addPost = async (req, res) => {
     let category = req.body;
     await Category.create(category);
     res.redirect('/');
};