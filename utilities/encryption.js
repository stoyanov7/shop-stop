const crypto = require('crypto');

module.exports = {
     generateSalt: () => {
          return crypto.randomBytes(128).toString('base64');
     },
     generateHashedPassword: (sawt, pwd) => {
          return crypto.createHmac('sha256', sawt).update(pwd).digest('hex');
     } 
};