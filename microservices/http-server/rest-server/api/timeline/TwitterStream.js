
var Twitter = require('twitter');
var util =  require('util');
var context = require('../../context');
const twitterAppConfig =  require('./twitter.auth.config');
var mesh = context.mesh;
const timeinterval = 30000;



var getTwitterStream = function(socket){
    var term ;
    var token;
    var twitterUserAuthConfig ={};
    var _client;
    var _stream;

     var startStream = function(client){
       console.log("======stream start called====");
        client.stream('statuses/filter', {track:'#100EpisodesOfKRPKAB'},function(stream) {
                 _stream = stream;
                  stream.on('data', function(tweet) {
                  socket.emit('tweetdata',tweet);
                  console.log(util.inspect(tweet));

                 });
                stream.on('error', function(error) {
                  console.log("=========stream error");
                  console.log(error);
                 setTimeout(startStream(client),timeinterval)
            });
         });
       };

   socket.on("creatstream",function(data){
    token = data.token;
    console.log("============================================INSIDE OF CREATE TWITTER STREAM===========================",data);

    mesh.act('role:jwt,cmd:verifyAuthToken',{token:token},function(err,response){
    if(err){
            console.log("====invalid token===");
          }
   else{
       console.log("====valid token===");
       var claims = response.claims;
       console.log("======================claims=====================================",claims);
       twitterUserAuthConfig.consumer_key = twitterAppConfig.consumer_key          // app key
       twitterUserAuthConfig.consumer_secret = twitterAppConfig.consumer_secret   // app secret
       twitterUserAuthConfig.access_token_key = claims.key;                      // user key
       twitterUserAuthConfig.access_token_secret = claims.secret;
       var _client = new Twitter(twitterUserAuthConfig);
       startStream(_client);
      }
    });  // end of mesh act

});

 socket.on('disconnect',function(){
    if(_stream){
      _stream.destroy();
    }
  });

}
exports = module.exports =  getTwitterStream;

// console.log(util.inspect(tweet.entities.hashtags));
// ioNsp.on("connection",function(socket){
// socket.emit("tweetData",tweet)
