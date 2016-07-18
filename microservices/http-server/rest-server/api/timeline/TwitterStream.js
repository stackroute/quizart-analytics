
var Twitter = require('twitter');
var util =  require('util');
const twitterConfig =  require('./user.auth.config');
{
                           consumer_key: 'T69ScJrXIes7AeobNr39WQsvR',
                           consumer_secret:'fQU0cEwJcrN1FVFcIAfwuSb0TYjx2WGrr4hFOgDpCUkgItCTI3',
                           access_token_key:'751412456090578944-eu50jZvaL0cTb3Ay5qLviBDQmvgCEit',
                           access_token_secret:'RLLipUmpibS73BBIWryC6arhVNgx1txdrKDtLRv6EluOO'
                           }
var context = require('./context');
context.client = client;
 var getTwitterStream = function(io){
twitterClient = new Twitter();
 var term = '#ShahOwaisiExposed';
 const timeinterval = 30000;

 client.stream('statuses/filter', {track:term},function(stream) {
         stream.on('data', function(tweet) {
           io.emit("tweetData",tweet);
           console.log(util.inspect(tweet.text));
         });
          //console.log(util.inspect(tweet.text));
      stream.on('error', function(error) {
           console.log(error);
          setInterval(timeinterval,getTwitterStream(io));
    });
});  //client.Stream end

}
exports = module.exports =  getTwitterStream;

// console.log(util.inspect(tweet.entities.hashtags));
// ioNsp.on("connection",function(socket){
// socket.emit("tweetData",tweet)
