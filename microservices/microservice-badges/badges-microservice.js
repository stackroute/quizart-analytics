var seneca = require('seneca');

var badgesMicroservice = seneca();

console.log('==================badges-microservice========================');

var env = process.env.NODE_ENV || 'dev';

badgesMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});

badgesMicroservice.use('mesh', {auto:true, pin: 'role:badges,cmd:*'});