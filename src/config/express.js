/**
 * Setup the middleware for parsing form data.
 * This file only set up the content folder. 
 * (the folder from which files are accessible to anyone)
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = (app, config) => {
     // Configure middleware for parsing form data.
     app.use(bodyParser.urlencoded({ extended: true }));

     // Configure "content" folder
     app.use((req, res, next) => {
          if (req.url.startsWith('/content')) {
               req.url = req.url.replace('/content', '');
          }

          next();
     }, express.static(path.normalize(path.join(config.rootPath, 'content'))
     ));
};