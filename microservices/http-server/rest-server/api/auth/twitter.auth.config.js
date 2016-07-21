var redirectHost = process.env.REDIRECT_HOST || 'quizart.stackroute.in';
var redirectPort = process.env.REDIRECT_PORT || 8001;

exports = module.exports =  {
  consumerKey: 'T69ScJrXIes7AeobNr39WQsvR',
  consumerSecret:'fQU0cEwJcrN1FVFcIAfwuSb0TYjx2WGrr4hFOgDpCUkgItCTI3',
  callback:'http://'+redirectHost+':'+redirectPort+'/api/v1/auth/twitter/success'
}
