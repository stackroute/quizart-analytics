var seneca = require('seneca');

var badgesPlugin = require('.');

var badgesMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

badgesMicroservice.use(badgesPlugin, {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});

badgesMicroservice.use('mesh', {auto:true, pin: 'role:badges,cmd:*'});
