var mongoose = require('mongoose');

var userLoginCounter = mongoose.model('userLoginCounter', { count: Number},'userLoginCounter');

module.exports = userLoginCounter;