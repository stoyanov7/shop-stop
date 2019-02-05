const homeHandler = require('./home');
const fileHandlers = require('./static-files');

module.exports = [ homeHandler, fileHandlers ];