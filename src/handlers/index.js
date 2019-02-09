const homeHandler = require('./home');
const fileHandlers = require('./static-files');
const productHandler = require('./product');
const categoryHandler = require('./category');

module.exports = [ homeHandler, fileHandlers, productHandler, categoryHandler ];