// var redirectPort = process.env.REDIRECT_PORT || 8001;
// var redirectHost = process.env.REDIRECT_HOST || "localhost";
var redirectPort = 8001;
var redirectHost = '192.168.99.100';

exports = module.exports =  {
  consumerKey: '0jyQWlJr83HiPcmPyHkBEzgGR',
  consumerSecret:'kAbzWjtRn0gS9VdIyNzL1PA6NxrYUZ6Y8MCc6eVtGJO8F02WP7',
  callback:'http://'+redirectHost+':'+redirectPort+'/api/v1/auth/twitter/success'
}
