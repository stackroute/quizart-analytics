var mongoose = require('mongoose');

var userLogin = mongoose.model('userLogin', { userId: String, loginTime: Date, success: Boolean },'userLogin');

module.exports = userLogin;