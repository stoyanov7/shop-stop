const homeHandler = require('./home');
const fileHandlers = require('./static-files');
const productHandler = require('./product');

module.exports = [ homeHandler, fileHandlers, productHandler ];